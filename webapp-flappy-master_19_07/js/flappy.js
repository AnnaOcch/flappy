var stateActions = { preload: preload, create: create, update: update };

//

var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
score = 0;
var labelScore;
var player;
var pipes = [];

jQuery("#greeting-form").on("submit", function(event_details) {

var greeting = "Hello ";

var name = jQuery("#fullName").val();
var email = jQuery("#email").val();
var greeting_message = greeting + email;
var score = jQuery("#score").val();
jQuery("#greeting-form").hide();

jQuery("#greeting").append("<p>" + greeting_message +":" + score +  "</p>");
if(isEmpty(fullName)) {

response.send("Please make sure you enter your name.");

}
//event_details.preventDefault();

});

function preload() {
game.load.image("playerImg", "../assets/flappy.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipe","../assets/pipe.png");
}

function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);
game.stage.setBackgroundColor("#F3D3A3");
game.add.text(20, 20, "Welcome to my game",
{font: "30px Arial", fill: "#FFFFFF"});
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
}

function update() {
game.physics.arcade
.overlap(player,
pipes,
gameOver);
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
function gameOver(){
	//location.reload();
	game.destroy();
	$("#score").val(score.toString());
	$("#greeting").show();
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

$.get("/score", function(scores){

scores.sort(function (scoreA, scoreB){

var difference = scoreB.score - scoreA.score;

return difference;

});

for (var i = 0; i < scores.length; i++) {

$("#scoreBoard").append(

"<li>" +

scores[i].name + ": " + scores[i].score +

"</li>");

}

});

function isEmpty(str) {

return (!str || 0 === str.length);

}