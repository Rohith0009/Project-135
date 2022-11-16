let canvas
let video
let obj_name
let objectDetector
let loaded

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO)
  video.center();
  video.hide()
}

function start(){
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  obj_name = document.getElementById("obj_name_input").value;
}

function modelLoaded(){
  loaded = true;
}

function draw() {
  image(video, 0, 0, 480, 380);
}