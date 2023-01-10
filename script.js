// set up canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// variables for game state
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballRadius = 10;
var ballSpeedX = 4;
var ballSpeedY = 4;
var player1Y = canvas.height / 2 - 50;
var player2Y = canvas.height / 2 - 50;
var playerWidth = 10;
var playerHeight = 100;
var playerSpeed = 10;
var player1Score = 0;
var player2Score = 0;

// draw functions
function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawRect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
}

function drawText(text, x, y) {
  ctx.font = "24px Arial";
  ctx.fillText(text, x, y);
}

function drawPlayer1() {
  drawRect(0, player1Y, playerWidth, playerHeight);
}

function drawPlayer2() {
  drawRect(canvas.width - playerWidth, player2Y, playerWidth, playerHeight);
}

function drawBall() {
  drawCircle(ballX, ballY, ballRadius);
}

function drawScore() {
  drawText(player1Score, canvas.width / 2 - 50, 50);
  drawText(player2Score, canvas.width / 2 + 25, 50);
}

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw game elements
  drawPlayer1();
  drawPlayer2();
  drawBall();
  drawScore();

  // update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // handle ball collision with top and bottom of canvas
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // handle ball going off left or right of canvas (scored)
  if (ballX - ballRadius < 0) {
    player2Score++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
  } else if (ballX + ballRadius > canvas.width) {
    player1Score++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -4;
  }

   // handle ball collision with player paddles
if (ballX - ballRadius < playerWidth &&
    ballY > player1Y && ballY < player1Y + playerHeight) {
  ballSpeedX = -ballSpeedX;
} else if (ballX + ballRadius > canvas.width - playerWidth &&
           ballY > player2Y && ballY < player2Y + playerHeight) {
  ballSpeedX = -ballSpeedX;
}

// move player paddles
document.onkeydown = function(event) {
  if (event.keyCode == 38) {
    player2Y -= playerSpeed;
  } else if (event.keyCode == 40) {
    player2Y += playerSpeed;
  } else if (event.keyCode == 87) {
    player1Y -= playerSpeed;
  } else if (event.keyCode == 83) {
    player1Y += playerSpeed;
  }
};
}

// call draw function every 10ms
setInterval(draw, 10);