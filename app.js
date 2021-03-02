const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// random time and hole for the mole
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up'); // add class to bring mole up
  setTimeout(() => {
    // return the mole
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    } else {
      alert('Game Over, Try Again'); // stops the game
    }
  }, time); // set to time
}

function startGame() {
  scoreBoard.textContent = 0; // reset score
  timeUp = false;
  score = 0;
  peep(); // starts the moles
  setTimeout(() => (timeUp = true), 10000); // 10 seconds to play
}

function bonk(e) {
  if (!e.isTrusted) return; // cheating the click
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
