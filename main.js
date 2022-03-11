song = "";
RwristX = 0;
RwristY = 0;
LwristX = 0;
LwristY = 0;
score_Lwrist = 0;
score_Rwrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', all_poses);

}

function modalLoaded() {
    console.log("Modal loaded successfully");
}

function draw() {
    image(video, 0, 0, 500, 400);

    fill("#FF0000");
	stroke("#FF0000");

    if(score_Rwrist > 0.2){
        // fill("blue");
        // stroke("black");
         circle(RwristX, RwristY, 20);
    
    if(RwristY > 0 && RwristY <= 100){
        document.getElementById("speed_ans").innerHTML = "0.5";
        song.rate(0.5);
    }

    else if(RwristY > 100 && RwristY <= 200){
        document.getElementById("speed_ans").innerHTML = "1";
        song.rate(1);
    }

    else if(RwristY > 200 && RwristY <= 300){
        document.getElementById("speed_ans").innerHTML = "1.5";
        song.rate(1.5);
    }

    else if(RwristY > 300 && RwristY <=400){
        document.getElementById("speed_ans").innerHTML = "2";
        song.rate(2);
    }
    

    }

    if(score_Lwrist > 0.2)
    {
    // fill("red");
    // stroke("black");
    circle(LwristX, LwristY, 20);
    num_LwristY = Number(LwristY);
    rem_decimal = floor(num_LwristY*2);
    final_1 = rem_decimal / 1000;
    song.setVolume(final_1);
    document.getElementById("volume_ans").innerHTML = final_1;
    
    }
}



function all_poses(results) {
    if (results.length > 0){
        console.log(results);
        score_Rwrist = results[0].pose.keypoints[10].score;
        score_Lwrist = results[0].pose.keypoints[9].score;

        RwristX = results[0].pose.rightWrist.x;
        RwristY = results[0].pose.rightWrist.y;

        LwristX = results[0].pose.leftWrist.x;
        LwristY = results[0].pose.leftWrist.y;

        console.log("Right Wrist X: " + RwristX + ", Right Wrist Y: " + RwristY);
        console.log("Left Wrist X: " + LwristX + ", Left Wrist Y: " + LwristY);
    }
}

function play_music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
