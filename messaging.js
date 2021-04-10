importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
var firebaseConfig = {
    apiKey: "AIzaSyDB66uFfEfDtUM_FXAoOtdLfTnKKLzHvMU",
    authDomain: "central-4a4fe.firebaseapp.com",
    databaseURL: "https://central-4a4fe-default-rtdb.firebaseio.com",
    projectId: "central-4a4fe",
    storageBucket: "central-4a4fe.appspot.com",
    messagingSenderId: "505151711668",
    appId: "1:505151711668:web:94781827c46abd27c3eae1",
    measurementId: "G-QZ62YZFXX5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});