const KEYS = "abcdefghijklmnopqrstuvwxyz";

const textArea = document.querySelector("#text-area");
const startButton = document.querySelector("#start");
const prompt = document.querySelector("#prompt");
const countdownLength = 3;

let randomLetter = null;
let timerStart;

textArea.addEventListener("keydown", (event) => {
  const key = event.key;
  let reaxionTime;
  textArea.value = "";
  if (key.toLowerCase() === randomLetter) {
    reaxionTime = (new Date().getTime() - timerStart) / 1000;
    setPrompt(`Nice! Your Reaxion time is ${reaxionTime} seconds.`);
    startButton.style.visibility = "visible";
    startButton.value = "Retry? [Press R]";
    randomLetter = null;
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key.toLowerCase() === "r" && randomLetter === null) {
    start();
  }
});

startButton.addEventListener("click", start);

function start() {
  startButton.style.visibility = "hidden";
  setTimeout(countdownEnd, countdownLength * 1000);
  for (let i = 0; i < countdownLength; i++) {
    setTimeout(
      setPrompt,
      i * 1000,
      `Next letter in ${countdownLength - i} seconds`
    );
  }
}

function setPrompt(message) {
  console.log(message);
  prompt.innerHTML = message;
}

function countdownEnd() {
  randomLetter = KEYS.charAt(Math.floor(Math.random() * KEYS.length));
  prompt.innerHTML = `The letter is <strong>${randomLetter}</strong>`;
  timerStart = new Date().getTime();
}
