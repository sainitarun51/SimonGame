var gamePattern = [];
var userClickedPattern = [];
var Level = 0;
var started = false;
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// $(document).on("keydown", function() {
//   if (Level == 0) {
//     nextSequence();
//   }
// });

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    gameOver();
  }
}

$(".btn").on("click", function(event) {
  var userChosenColour = $(event.target).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
  userClickedPattern=[];
  Level++;
  $("h1").text("Level " + Level);
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  playSound(buttonColors[randomNumber]);
  $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
}

function gameOver() {
  $("h1").text("Game Over, Press any key to Restart!");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  playSound("wrong");
  startOver();
}

function startOver(){
  Level=0;
  gamePattern=[];
  started=false;
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
