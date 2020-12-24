// jshint esversion : 6

if (localStorage.getItem("aimPractice_highestScore") === null) {
  let highestScore = {
    score : 0
  };

  let serializeScore = JSON.stringify(highestScore);
  localStorage.setItem("aimPractice_highestScore", serializeScore);
}

let currentBest = JSON.parse(localStorage.getItem("aimPractice_highestScore"));
const highestScore = document.querySelector('.highestScore');
highestScore.textContent = `Highest Score : ${currentBest.score}`;



const ball = document.querySelector('.circle');
ball.style.visibility = `hidden`;

let ballImage = document.querySelector('.circleImage');

const game = document.querySelector('.game');

const startButton = document.querySelector('.startGame');


const scoreBoard = document.querySelector('.score');

let timeUp = false;
let score = 0;
scoreBoard.textContent = `Score : ${score}`;


function start(){
    score = 0;
    timeUp = false;
    ball.style.visibility = `visible`;
    scoreBoard.textContent = `Score : ${score}`;
    generate();
    setTimeout(()=>{
      timeUp = true;
    }, 30000);
}



function generate(){

  let left = Math.round(Math.random() * (750 - 0) + 0);

  let top2 = Math.round(Math.random() * (450 - 0) + 0);


  ball.style.marginLeft = `${left}px`;
  ball.style.marginTop = `${top2}px`;

  ballImage.src = 'circle.png';
  game.appendChild(ball);

  setTimeout(() => {
    if(timeUp){
      ball.style.visibility = `hidden`;
      if(currentBest.score < score){
        currentBest.score = score;
        highestScore.textContent = `Highest Score : ${currentBest.score}`;
        let newCurrentBest = JSON.stringify(currentBest);
        localStorage.setItem("aimPractice_highestScore", newCurrentBest);
      }
      return;
    }
    generate();
  }, 800);
}

function updateScore(){
  score++;
  scoreBoard.textContent = `Score : ${score}`;
  var audio = new Audio('sound.webm');
  audio.play();
  setTimeout(()=>{
    ballImage.src = `poppedCircle.png`;
  },20);
}


ball.addEventListener('click', updateScore);
startButton.addEventListener('click', start);
