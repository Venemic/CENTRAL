//CAPUTRE
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );
var search = document.getElementById( "search" );
var cameraStream = null;

// Attach listeners
// Start Streaming
function startStreaming() {
    stream.hidden=false;
    search.hidden=true;
var mediaSupport = 'mediaDevices' in navigator;

if( mediaSupport && null == cameraStream ) {

navigator.mediaDevices.getUserMedia( { video: true } )
.then( function( mediaStream ) {

cameraStream = mediaStream;

stream.srcObject = mediaStream;

stream.play();
})
.catch( function( err ) {

console.log( "Unable to access camera: " + err );
});
}
else {

alert( 'Your browser does not support media devices.' );

return;
}
}
// Stop Streaming
function stopStreaming() {
  search.hidden=false;
  capture.hidden=true;
if( null != cameraStream ) {

var track = cameraStream.getTracks()[ 0 ];

track.stop();
stream.load();

cameraStream = null;
}
}
var img = new Image();
var ctx;
function captureSnapshot() {
  stream.hidden=true;
  capture.hidden=false;
if( null != cameraStream ) {

ctx = capture.getContext( '2d' );

ctx.drawImage( stream, 0, 0, capture.width, capture.height );

img.src		= capture.toDataURL( "image/png" );
img.width	= 240;

snapshot.innerHTML = '';

snapshot.appendChild( img );
}
}//CAPTURE END

////////////////////////////////////////////////////////////
//FACE-RECOGNITION
const imageUpload = document.getElementById('imageUpload')
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then()

async function start() {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)
  
  imageUpload.addEventListener('change', async () => {
    if (ctx) ctx.remove()
    const displaySize = { width: img.width, height: img.height }
    faceapi.matchDimensions(ctx, displaySize)
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(ctx)
      
    })
  })
  document.body.append('true')
  window.location.replace("https://www.youtube.com/");
  window.onload = maxWindow;
}

function loadLabeledImages() {
  const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
////////////////////////////////////////////////////////////


    function maxWindow() {
        window.moveTo(0, 0);

        if (document.all) {
            top.window.resizeTo(screen.availWidth, screen.availHeight);
        }

        else if (document.layers || document.getElementById) {
            if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
                top.window.outerHeight = screen.availHeight;
                top.window.outerWidth = screen.availWidth;
            }
        }
    }