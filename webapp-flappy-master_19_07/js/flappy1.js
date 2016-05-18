// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 55;
score = 10;
score = 200;
var insidescore = 300;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("chocolate", "../assets/chocolate.jpg");
    game.load.image("pipe","../assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //var insidescore = 30;
    // set the background colour of the scene
    game.stage.setBackgroundColor("#A34FF4");

    game.add.text(600, 350, "hi everyone!!");

    game.add.sprite(50, 100, "chocolate");

   // game.input.onDown.add(clickHandler);


    console.log(score);
    myfunction();
    console.log("Out of the function " + insidescore);
    //game.add.sprite(20, 0, "pipe");
    //game.add.sprite(20, 50, "pipe");
    //game.add.sprite(20, 100, "pipe");
    //game.add.sprite(20, 150, "pipe");
    //game.add.sprite(20, 200, "pipe");
    //game.add.sprite(20, 250, "pipe");
    //game.add.sprite(20, 300, "pipe");
    //game.add.sprite(20, 350, "pipe");

    for(var count=0; count < 8; count+=1){
        if (count != 4 && count!=5){
            game.add.sprite(20, 50*count, "pipe");
        }
    }

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}



function myfunction(){
    var insidescore = 20; //local variable
    console.log("Within the function " + insidescore);
    console.log("This is the score in myfunction " +score);
}


function clickHandler(event) {
    alert("CLICK!");
    game.add.sprite(event.x, event.y,"chocolate");
}




//function clickHandler(event) {
//    game.add.sprite(event.x, event.y,"chocolate");
//}
