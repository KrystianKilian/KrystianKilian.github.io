let sequence = [];
let playerSequence = [];
let flash;
let turn;
let good;
let playerTurn;
let intervalID;
let win;
let on = false;
let hs =0;
let time;

const score = document.querySelector("#score");
const highScore = document.querySelector("#highscore");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const start = document.querySelector("#start");
const icon = document.querySelector("#icon");
const stat = document.querySelector("#status");
var loseH = new Audio('loseHorn.mp3');
var yippee = new Audio('yippee.mp3');


/* when start button is pressed the game starts and
the indicator turns green */
start.addEventListener('click', (event) =>
{
    icon.style.backgroundColor = "#3edd4b";
    play();
});

var seconds = 0;
function incrementSeconds()
{
  seconds += 1;
  console.log(seconds);
  if(seconds >= 5 && seconds < 6)
  {
    lose();
  }
}

function play()
{
    stat.innerHTML = "";
    win = false;
    sequence = [];
    playerSequence = [];
    flash = 0;
    intervalID = 0;
    playerTurn = 1;
    score.innerHTML = 0;
    good = true;
    s = 0;

    // chooses 20 random numbers to push into sequence array
    for(var i = 0; i < 20; i++)
    {
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }

    turn = true;

    intervalID = setInterval(gameTurn, 600);
}

function gameTurn()
{
  on = false;

    if(flash == playerTurn)
    {
        clearInterval(intervalID);
        turn = false;
        clearColour();
        time = setInterval(incrementSeconds, 1000);
    }

    if(turn)
    {
        clearColour();
        setTimeout(() =>
        { //each number in the array has a corresponding colour
            if(sequence[flash] == 1) one();
            if(sequence[flash] == 2) two();
            if(sequence[flash] == 3) three();
            if(sequence[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one()
{
    green.style.backgroundColor = "white";
}

function two()
{
    red.style.backgroundColor = "white";
}

function three()
{
    yellow.style.backgroundColor = "white";
}

function four()
{
    blue.style.backgroundColor = "white";
}

function clearColour()
{
    green.style.backgroundColor = "#3edd4b";
    red.style.backgroundColor = "#dd4b3e";
    yellow.style.backgroundColor = "#ffea37";
    blue.style.backgroundColor = "#4b3edd";
}



function flashColour()
{
    green.style.backgroundColor = "white";
    red.style.backgroundColor = "white";
    yellow.style.backgroundColor = "white";
    blue.style.backgroundColor = "white";
}

green.addEventListener('click', (event) =>
{
  playerSequence.push(1);
  check();
  one();
  seconds = 0;
  if(!win)
  {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})
  
red.addEventListener('click', (event) =>
{
  playerSequence.push(2);
  check();
  two();
  seconds = 0;
  if(!win) {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})

yellow.addEventListener('click', (event) =>
{
  playerSequence.push(3);
  check();
  three();
  seconds = 0;
  if(!win)
  {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})
  
blue.addEventListener('click', (event) =>
{
  playerSequence.push(4);
  check();
  four();
  seconds = 0;
  if(!win) {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
});

function check()
{
  // stopping intervals
  clearInterval(time);
  clearInterval(intervalID);
  seconds = 0; // resets 5 second counter

  /* if the player sequence isn't the same as the computer
  sequence the player loses
  */
  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1])
  {
    good = false;
  }

  // if the player completes 20 rounds they win and the game stops
  if (playerSequence.length == 20 && good)
  {
    win = true;
      winGame();
  }

  // upon losing the lose function is called
  if (good == false)
  {
    lose();
  }

  /* if the player completes the round the turn increases and the next round is played
  when the score is 6, 9 and 13 the interval between flashing
  increases
  */
  if (playerTurn == playerSequence.length && good && !win)
  {
    playerTurn++;
    playerSequence = [];
    turn = true;
    flash = 0;
    score.value = playerTurn - 1;

    if(playerTurn < 6)
    {
      intervalID = setInterval(gameTurn, 600);
    }

    else if(playerTurn => 6)
    {
      intervalID = setInterval(gameTurn, 450);
    }

    else if(playerTurn => 10)
    {
      intervalID = setInterval(gameTurn, 300);
    }

    else if(playerTurn => 14)
    {
      intervalID = setInterval(gameTurn, 250);
    }
  }
}


// when the game is won the indicator turns red again
function winGame()
{
  icon.style.backgroundColor = "#dd4b3e";
  if(playerTurn - 1 == 20)
  {
    highScore.value = 20;
  }
  stat.innerHTML = "You win! Hit start to play again";
  yippee.play();
}

/* upon the player losing the buttons flash 5 times
  and the on indicator turns back to red.
*/
localStorage.setItem("hscore", hs);
function lose()
{ 
  if(playerTurn - 1 >= hs)
  {
    hs = playerTurn - 1;
    localStorage.setItem("hscore", hs);
    var highs = localStorage.getItem("hscore");
    highScore.value = highs;
  }

  for(var i = 900; i < 4750; i = i + 900)
  {
    setTimeout("flashColour()", i);
    setTimeout("clearColour()", i + 500);
  }

  setTimeout(() =>
  {
      highScore.innerHTML = turn;
      clearColour();
      icon.style.backgroundColor = "#dd4b3e";
  }, 800);
  seconds = 0;
  clearInterval(time);

  stat.innerHTML = "You lose! Hit start to try again";
  loseH.play();
}