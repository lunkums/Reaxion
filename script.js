const KEYS = "abcdefghijklmnopqrstuvwxyz";

const textArea = document.querySelector("#text-area");
const startButton = document.querySelector("#start");
const prompt = document.querySelector("#prompt");
const leaderboard = document.querySelector(".leaderboard");
const countdownLength = 3;

let bestTime = Infinity;
let randomLetter = null;
let timerStart;

textArea.addEventListener("keydown", (event) => {
  const key = event.key;
  let reaxionTime;

  textArea.value = "";
  if (key.toLowerCase() === randomLetter) {
    reaxionTime = (new Date().getTime() - timerStart) / 1000;
    setPrompt(getPromptFromTime(reaxionTime));
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

function getPromptFromTime(time) {
  let promptPrefix;

  if (setBestTime(time)) {
    promptPrefix = "New record!";
  } else if (time > 15) {
    promptPrefix = "Did you fall asleep at the keyboard? ";
  } else if (time > 7) {
    promptPrefix = "Awful. ";
  } else if (time > 3) {
    promptPrefix = "Bad. ";
  } else if (time > 1) {
    promptPrefix = "Not great. ";
  } else if (time > 0.5) {
    promptPrefix = "Good. ";
  } else if (time > 0.4) {
    promptPrefix = "Great. ";
  } else {
    promptPrefix = "Awesome! ";
  }

  return promptPrefix + ` Your Reaxion time is ${time} seconds.`;
}

function setPrompt(message) {
  console.log(message);
  prompt.innerHTML = message;
}

function setBestTime(time) {
  if (time < bestTime) {
    bestTime = time;
    leaderboard.innerHTML = `Best time: ${bestTime}`;
    return true;
  }
  return false;
}

function countdownEnd() {
  randomLetter = KEYS.charAt(Math.floor(Math.random() * KEYS.length));
  prompt.innerHTML = `The letter is <strong>${randomLetter}</strong>`;
  timerStart = new Date().getTime();
}
