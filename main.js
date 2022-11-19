let canvas;
let video;
let obj_name;
let objectDetector;
let loaded;
objects = [];

const status_label = document.getElementById("status");

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.center();
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  status_label.innerHTML = "Detecting Objects...";
  obj_name = document.getElementById("obj_name_input").value;
}

function modelLoaded() {
  loaded = true;
  status_label.innerHTML = "Objects Detected";
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (loaded) {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      if (objects[i].label == obj_name) {
        video.stop();
        status_label.innerHTML = `${obj_name} is found.`;
      } else {
        status_label.innerHTML = `${obj_name} is not found.`;
        console.log(objects);
        fill("#fffff");
        accuracy = Math.floor(objects[i].confidence * 100);
        text(`${objects[i].label} ${accuracy}`, objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#fffff");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  objects = results;
}
