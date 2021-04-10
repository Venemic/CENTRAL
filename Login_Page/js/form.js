
//REGISTER CODE
function signup() {
         var email=document.getElementById('email').value;
         var password=document.getElementById('password').value;
         firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
          location.replace("../profile.html");
         }).catch(function(error){
          var errorcode=error.code;
          var errormsg=error.message;
          window.alert("Error : " +errormsg)
         });
        }
//LOGIN-CODE
  	  function loginuser(){
         var email=document.getElementById('email').value;
         var password=document.getElementById('password').value;
         firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
      
          var id=firebase.auth().currentUser.uid;
          window.location.replace("../DASH/DASH.html");
          localStorage.setItem('id',id);
          
         }).catch(function(error){
      
          var errorCode=error.code;
          var errorMsg=error.message;
          window.alert("Error : " +errorMsg)
          window.location.reload();
         });
}
        
//SEND EMAIL TO VERIFY
function sendVerificationEmail()  {
    //Built in firebase function responsible for sending the verification email
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
        window.alert('Verification Email Sent Successfully !');
        //redirecting the user to the profile page once everything is done correctly
    }).catch(error => {
        console.error(error);
    });
}
//CHECK-STATE
function checklogin(){
  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    
          var user = firebase.auth().currentUser;
          if(user != null){
               displaydata();
         var fileName = location.href.split("/").slice(-1); 
            if(fileName == "profile.html"|| fileName == "profile.html#" ){
              var email = user.emailVerified;
              if(email)
                  {
                      var veri =  document.getElementById("verify");
                         veri.checked = true;
                         veri.style.display = "block";
                  } 
            }
            
            // sendVerificationEmail();
          } 
        } else {
        window.alert('User is not logged in');
        window.location.replace('../Login_Page/index.html');
        }
    });
    }
 //READING AND WRITTING OF DATA
 
 var fname, rgno, dept, phone, mail,name1;
	
 function Ready(){
  
   fname = document.getElementById('fullname').value;
   rgno = document.getElementById('regno').value;
   dept = document.getElementById('dept').value;
   phone = document.getElementById('phone').value;
   mail = document.getElementById('email').value;
   name1   = mail.substring(0, mail.lastIndexOf("@"));
 }
 //-------------------------------Insert Data---------------------------------//
  function insertdata(){
    
    if(document.getElementById("image") != null)
    {
   if(document.getElementById("fullname").value.length == 0)
  {
      alert("Please fill your name first.")
  }
  else{
    if(document.getElementById("regno").value.length == 0)
    {
        alert("Please fill your Register Number first.")
    }
    else{
      if(document.getElementById("dept").value.length == 0)
      {
          alert("Please fill your Department Number first.")
      }
      else
      {
        if(document.getElementById("phone").value.length == 0)
        {
            alert("Please fill your Phone Number first.")
        }
        else
        {
          Ready();
            var fileName = location.href.split("/").slice(-1); 
            if(fileName == "profile.html"|| fileName == "profile.html#"){
                 window.location.replace('Choice Page/index.html');
            }
            
            firebase.database().ref('User/'+name1).set({
              Full_Name : fname,
              Register_Number : rgno,
              Department : dept,
              Phone_Number : phone,
              Email : mail,
              Image_url : null
            });
           
          }
        }      
    }
    
  }
 }
}
 //-------------------------------Select Data---------------------------------//
 function displaydata(){
  var user = firebase.auth().currentUser,d;
  var email_id = user.email;
  var name2   = email_id.substring(0, email_id.lastIndexOf("@"));
  var ref = firebase.database().ref("Student");
  ref.once("value")
    .then(function(snapshot) {
       d = snapshot.child(name2).exists(); // false
       if(d){
        firebase.database().ref('Student/'+name2).on('value',function(snapshot){
                document.getElementById('fullname').value = snapshot.val().Full_Name;
                document.getElementById('regno').value = snapshot.val().Register_Number;
                document.getElementById('dept').value = snapshot.val().Department; 
                document.getElementById('phone').value = snapshot.val().Phone_Number; 
                document.getElementById('email').value = snapshot.val().Email; 
              });
         }
    });
     ref = firebase.database().ref("Faculty");
    ref.once("value")
      .then(function(snapshot) {
         d = snapshot.child(name2).exists(); // false
         if(d){
          firebase.database().ref('Faculty/'+name2).on('value',function(snapshot){
                  document.getElementById('fullname').value = snapshot.val().Full_Name;
                  document.getElementById('regno').value = snapshot.val().Register_Number;
                  document.getElementById('dept').value = snapshot.val().Department; 
                  document.getElementById('phone').value = snapshot.val().Phone_Number; 
                  document.getElementById('email').value = snapshot.val().Email; 
                });
           }
      });
      ref = firebase.database().ref("User");
      ref.once("value")
        .then(function(snapshot) {
           d = snapshot.child(name2).exists(); // false
           if(d){
            firebase.database().ref('User/'+name2).on('value',function(snapshot){
                    document.getElementById('fullname').value = snapshot.val().Full_Name;
                    document.getElementById('regno').value = snapshot.val().Register_Number;
                    document.getElementById('dept').value = snapshot.val().Department; 
                    document.getElementById('phone').value = snapshot.val().Phone_Number; 
                    document.getElementById('email').value = snapshot.val().Email; 
                  });
             }
        });
   }
 //-------------------------------Update Data---------------------------------//
  function updatedata(){
   Ready();
   firebase.database().ref('User/'+name1).update({
     Full_Name: fname,
     Register_Number: rgno,
     Department: dept,
     Phone_Number: phone,
     Email: mail
   });
 }
 //-------------------------------Delete Data---------------------------------//
   function deletedata(){
   Ready();
   firebase.database().ref('User/'+name1).remove();
 }
// HIDE AND SHOW MESSAGE
 function shows() {
  var x = document.getElementById("work");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//UPLOADING IMAGE
function upload() {``
  var uploader=document.getElementById("uploader");
  //get your select image
  var image=document.getElementById("image").files[0];
  //now get your image name
  var user = firebase.auth().currentUser;
  var email_id = user.email;
  var name2   = email_id.substring(0, email_id.lastIndexOf("@"));
  var imageName=name2;
  //firebase  storage reference
  //it is the path where yyour image will store
  var storageRef=firebase.storage().ref(name2+'/Profile');
  //upload image to selected storage reference

  var uploadTask=storageRef.put(image);

  uploadTask.on('state_changed',function (snapshot) {
      //observe state change events such as progress , pause ,resume
      //get task progress by including the number of bytes uploaded and total
      //number of bytes
      var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      uploader.value=progress;
      console.log("upload is " + progress +" done");
  },function (error) {
      //handle error here
      console.log(error.message);
  },function () {
     //handle successful uploads on complete

      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          //get your upload image url here...
          var myurl = downloadURL;
          var user = firebase.auth().currentUser,d;
  var email_id = user.email;
  var name2   = email_id.substring(0, email_id.lastIndexOf("@"));

  var ref = firebase.database().ref("Student");
  ref.once("value")
    .then(function(snapshot) {
       d = snapshot.child(name2).exists(); // false
       if(d){
        firebase.database().ref('Student/'+name2).update({
          Image_url: myurl,
        });
         }
        else
        {
          firebase.database().ref('Faculty/'+name2).update({
            Image_url: myurl,
          });
        }
      });
      });
  });

}
function create_class_code(){
    document.getElementById("cclass").style.hidden=true;
}
