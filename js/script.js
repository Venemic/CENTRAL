const video = document.getElementById('videoInput')
const reslt = document.getElementById('result')
var meet_link;
var flag=0;
var str = "";
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

function start() {
    document.body.append('Models Loaded')
    
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error()
    )
    
    recognizeFaces()
}

  
async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)


    video.addEventListener('play', async () => {
       
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        

        setInterval(async () => {
            
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            
            results.forEach( (result, i) => {
              
                reslt.innerHTML = result.toString();
                str = result.toString();
                if(str.includes('unknown')){
                    flag=0;
                }
                else
                {    
                    flag=1;
                }  
            })
            if(flag==0) window.alert("Invalid User");
           
    
        }, 1)
        if(flag==1)
        {
            
            var user = firebase.auth().currentUser;
                var email_id = user.email;//Fetch current user's email
                var name1   = email_id.substring(0, email_id.lastIndexOf("@"));
                firebase.database().ref('Student/'+name1+'/SUBSCRIBE').on('value', function(snapshot){
                  snapshot.forEach(function(childNodes){
                        var cod=childNodes.val().CODE;
                        firebase.database().ref('Subject-Room/'+cod).on('value', function(snapshot){
                          meet_link = snapshot.val().Meet_Link;
                          window.open(meet_link);
                          window.alert('Attendance is marked');
                        });
                        });
                      }); 
        }  

        
    })
    

}


function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Shivam Singh'] // for WebCam
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}