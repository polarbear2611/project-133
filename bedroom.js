img = "";
status = "";
objects = [];
function preload() {
    img = loadImage("bedroom.png");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("object_detected").innerHTML = "Status : detecting object";
}

function draw() {

    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("object_detected").innerHTML = "There are 4 big images and the model recognised 1";
            percentage = floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}