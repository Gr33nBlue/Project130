sound = "";
status1 = "";
objects = [];

function preload() {
    sound = loadSound("halloween_movie.mp3"); 
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocosd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}

status1 = "";
function modelLoaded() {
    console.log('Cocosd IS WORKING');
    status1 = true;
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}
percent = "";
function draw() {
    image(video, 0, 0, 400, 400);

    if(status1 != "") {
    for(var i = 0; i < objects.length; i++) {

        percent = ""
        fill('#00FF00');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke('#00FF00');
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == "person") {
            document.getElementById("status").innerHTML = "Baby has been Detected";
            sound.stop();
        }
        else{
            document.getElementById("status").innerHTML = "Baby has not been Detected";
            sound.play();
        }
        if(objects.length == 0) {
            document.getElementById("status").innerHTML = "Baby has not been Detected";
            sound.play();
        }
}
}
}