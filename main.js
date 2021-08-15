song = ""

scoreLeftWrist = 0
scoreRightWrist = 0

leftWristX = 0
leftWristY = 0

rightWristX = 0
rightWristY = 0

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
	canvas =  createCanvas(500, 400);
	canvas.position(500,320);

	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(" Left Wrist X value = "+leftWristX+" Left Wrist Y value = "+leftWristY+ "Right Wrist X value = "+rightWristX+ "Right Wrist Y value = "+rightWristY );
    }
}

function modelLoaded()
{
    console.log("PoseNet Status = Initialised")
}
function draw()
{
    image(video,0,0,500,400);

    fill("#800000");
    stroke("#800000");

    if(scoreLeftWrist > 0.0000001)
    {   
    circle(rightWristX,rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed_id").innerHTML = "0.5x";
        song.rate(0.5);
    }

    if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed_id").innerHTML = "1x";
        song.rate(1);
    }

    if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed_id").innerHTML = "1.5x";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed_id").innerHTML = "2x";
        song.rate(2);
    }
    
    if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed_id").innerHTML = "2.5x";
        song.rate(2.5);
    }
   }




    if(scoreLeftWrist > 0.0000001)
    {   
    circle(leftWristX,leftWristY,20);
    inNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(inNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume = leftWristY_divide_1000*2;
    document.getElementById("volume_id").innerHTML = volume;
    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}
