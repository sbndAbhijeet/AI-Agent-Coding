let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function startTimer() {
 timerInterval = setInterval(() => {
 milliseconds += 10;
 if (milliseconds === 1000) {
 seconds++;
 milliseconds = 0;
 if (seconds === 60) {
 minutes++;
 seconds = 0;
 }
 }

 minutesDisplay.textContent = pad(minutes);
 secondsDisplay.textContent = pad(seconds);
 millisecondsDisplay.textContent = pad(milliseconds / 10);
 }, 10);
}

function pad(number) {
 return (number < 10 ? '0' : '') + number;
}

startBtn.addEventListener('click', () => {
 if (!timerInterval) {
 startTimer();
 }
});

pauseBtn.addEventListener('click', () => {
 clearInterval(timerInterval);
 timerInterval = null;
});

resetBtn.addEventListener('click', () => {
 clearInterval(timerInterval);
 timerInterval = null;
 minutes = 0;
 seconds = 0;
 milliseconds = 0;
 minutesDisplay.textContent = '00';
 secondsDisplay.textContent = '00';
 millisecondsDisplay.textContent = '00';
});
