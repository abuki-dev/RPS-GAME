const playerChoice = document.getElementById("player-choice");
const totalrounds = document.getElementById("totalrounds");
const current = document.getElementById("currunt-round");
const finall = document.getElementById("result");
const yourscore = document.getElementById("your-score");
const comuterscore = document.getElementById("computer-score");
const buttons = document.querySelectorAll("button");
const modal = document.getElementById("game-modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");

// Initialize scores as numbers
let humanscore = 0;
let computerscore = 0;
function showAlert(message) {
  const icon = document.getElementById("modal-icon");
  modalMessage.textContent = message;

  if (message.includes("won")) icon.textContent = "🏆";
  else if (message.includes("lost")) icon.textContent = "💥";
  else icon.textContent = "🤝"; // For draws

  modal.classList.remove("hidden");
}
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  // Hide it
});
function getcomputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;
  if (choice === 1) return "Rock";
  if (choice === 2) return "Papper";
  if (choice === 3) return "Scissor";
}

function playround() {
  const computer = getcomputerChoice();
  const human = playerChoice.value;
  let result = "";

  // Handle Draw first
  if (computer === human) {
    return `Both chose ${computer}. It's a draw!`;
  }

  const win =
    (computer === "Rock" && human === "Papper") ||
    (computer === "Papper" && human === "Scissor") ||
    (computer === "Scissor" && human === "Rock");

  if (win) {
    humanscore++;
    result = `Computer chose ${computer}, you won!`;
  } else {
    computerscore++;
    result = `Computer chose ${computer}, you lost!`;
  }

  // Update Scoreboard immediately
  yourscore.textContent = humanscore;
  comuterscore.textContent = computerscore;
  return result;
}
function finalresult() {
  if (humanscore > computerscore) {
    finall.textContent = `FINAL: You won the match ${humanscore}-${computerscore}!`;
  } else if (computerscore > humanscore) {
    finall.textContent = `FINAL: You lost the match ${humanscore}-${computerscore}.`;
  } else {
    finall.textContent = `FINAL: The match is a tie!`;
  }
}
function reset() {
  humanscore = 0;
  computerscore = 0;
  yourscore.textContent = "0";
  comuterscore.textContent = "0";
  current.textContent = "0";
  totalrounds.value = "";
}

function startGame() {
  let cur = Number(current.textContent);
  let tot = Number(totalrounds.value);

  // Check if user selected something
  if (playerChoice.value === "") {
    showAlert("Please choose Rock, Papper, or Scissor first!");
    return;
  }

  if (cur < tot) {
    const domination =
      (humanscore > Math.floor(tot / 2) ||
        computerscore > Math.floor(tot / 2)) &&
      (humanscore > tot - cur || computerscore > tot - cur);
    if (domination) {
      finalresult();
      reset();
      return;
    }
    const roundResult = playround();
    showAlert(roundResult);

    cur = cur + 1;
    current.textContent = cur;
    playerChoice.value = ""; // Reset choice for next round

    // Check for Game Over
    if (cur === tot) {
      finalresult();
      reset();
      // Reset internal variables and display for a new game
    }
  }
}

// Event Listeners for all buttons
for (const button of buttons) {
  button.addEventListener("click", () => {
    // 1. Get the data-choice value
    const choice = button.getAttribute("data-choice");

    // 2. Handle the "Continue" button first - DO NOTHING and EXIT
    if (button.id === "close-modal") {
      return; // This stops the code here so it doesn't clear the result!
    }

    // 3. If it's NOT the close button, THEN we can clear the old result
    finall.textContent = "";

    // 4. Handle Start logic
    if (button.textContent.includes("Start Game")) {
      startGame();
    }
    // 5. Handle weapon choice logic
    else if (choice) {
      playerChoice.value = choice;
    }
  });
}
