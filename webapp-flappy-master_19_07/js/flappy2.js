var stateActions = { preload: preload, create: create, update: update };

//

var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
score = 0;
var labelScore;
var player;
var pipes = [];
var FBtext = "Flappy Bird";
var collectedLetters = new Array(FBtext.length).fill(0);
var gameOn = 1;
//collectedLetters.length = FBtext.length; // letters in Flappy Bird including space


//simulate
collectedLetters[1] = 1;
collectedLetters[3] = 1;
collectedLetters[5] = 1;


function preload() {
game.load.image("playerImg", "../assets/flappy.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipe","../assets/pipe.png");
}

function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);
game.stage.setBackgroundColor("#ffccff");
var FB = game.add.text(20, 350, "Flappy Bird",
{font: "40px Arial", fill: "#4d79ff",fontWeight: "bold"});
var color = "white";
	    //  And now we'll color in some of the letters
    //FB.addColor('#ffff00', 1);
    
    for(i=0; i < collectedLetters.length; i++){
    	console.log(i);	    
	    if(collectedLetters[i] == 1 && color == "white"){
	    	color = "red";
	    	changeColor(FB, i, color); 	
	    }
	    if(collectedLetters[i] == 0 && color == "red"){
	    	color = "white";
	    	changeColor(FB, i,color);
	    	
	    }
	    if(collectedLetters[i] == 0 && color == "white"){
	    	//no problem
	    }
	    if(collectedLetters[i] == 1 && color == "red"){
	    	//no problem
	    }
    }
    
   // FB.addColor('#ffffff', 5, 7);
//changeColor(FB, 3);
    //FB.addColor('#ff00ff', 5);
    //FB.addColor('#ffffff', 7);


//game.add.sprite(10, 270, "playerImg");
// game.input
// .onDown
// .add(clickHandler);

// game.input
// .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
// .onDown.add(spaceHandler);
//
player = game.add.sprite(100, 200, "playerImg");
game.physics.arcade.enable(player);
player.body.velocity.x = 100;
player.body.gravity.y = 150;
player.x = 10;
player.y = 200;
labelScore = game.add.text(20, 20, "0");
game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
.onDown.add(moveRight);
generatePipe();
game.input.keyboard
.addKey(Phaser.Keyboard.SPACEBAR)
.onDown.add(playerJump);
var pipeInterval = 1.75;
game.time.events
.loop(pipeInterval * Phaser.Timer.SECOND,
generatePipe);
player.anchor.setTo(0.5, 0.5);
player.rotation = Math.atan(player.body.velocity.y / 200);
}

function update() {
game.physics.arcade
.overlap(player,
pipes,
gameOver);
if(player.body.y < 0) {
gameOver();
}

if(player.body.y > 400){
gameOver();
}
}

function gameOver(){
//game.destroy();
game.lockRender = true;
}

function playerJump() {
player.body.velocity.y = -200;
}

function clickHandler(event) {

alert("click!");

}
function spaceHandler() {
game.sound.play("score");
}
function clickHandler(event) {
game.add.sprite(event.x, event.y, "playerImg");
}

function changeScore() {
score = score + 1;
labelScore.setText(score.toString());
}

function moveRight() {
player.x = player.x + 1;
}

function generatePipe() {
var gap = game.rnd.integerInRange(1 ,5);
for (var count = 0; count < 8; count++) {
if (count != gap && count != gap+1) {
addPipeBlock(750, count * 50);
}
}
changeScore();
}

function addPipeBlock(x, y) {
var pipeBlock = game.add.sprite(x,y,"pipe");
pipes.push(pipeBlock);
game.physics.arcade.enable(pipeBlock);
pipeBlock.body.velocity.x = -200;
}

function changeColor(string, position, color){
	if(color == "red"){
		string.addColor('#ff0000', position);
		console.log(position);
		console.log("red");
	}
	else{
		string.addColor('#4d79ff', position);
		console.log(position);
		console.log("white");
	}	
}