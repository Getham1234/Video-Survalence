objects = [];
video = "";
status = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status – Detecting Objects";
}

function draw(){
    image(video, 0, 0, 400, 400);

    if(status != ""){
        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects: " + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#91E5B2");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function pause(){
    video.pause();
}

function stop(){
    video.stop();
}

function speed_change(){
    slider = document.getElementById("slider").value;
    video.speed(slider);
}

function gotResults(error, results){
 if(error){
     console.error(error);
 }
 else{
     objects = results;
     console.log(objects);
 }
}