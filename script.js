const win_conditions = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER",
};

const choices = ["ROCK", "PAPER", "SCISSORS"];

function getComputerChoice() {
  let random_idx = Math.floor(Math.random() * 3);
  return choices[random_idx];
}

function getHumanChoice() {
  while (true) {
    let choice = prompt("Enter your choice (Rock or Paper or Scissors) :");

    if (choice == null || choice.length == 0) {
      console.log("Empty selection, retry");
      continue;
    }
    choice = choice.toUpperCase();
    if (choice == "ROCK" || choice == "PAPER" || choice == "SCISSORS") {
      return choice;
    } else {
      console.log("Invalid entry!!! Try again...");
    }
  }
}

function playRound(human_choice, computer_choice) {
  console.log(`Your choice is ${human_choice}`);
  console.log(`Computer's choice is ${computer_choice}`);
  if (human_choice == computer_choice) {
    return "It's a TIE!";
  }
  if (win_conditions[human_choice] === computer_choice) {
    human_score++;
    return `You WIN! ${human_choice} beats ${computer_choice}`;
  } else {
    computer_score++;
    return `Computer WINS! ${computer_choice} beats ${human_choice}`;
  }
}

let human_score = (computer_score = 0);

console.log("Let's play Rock, Paper, Scissors");

const button = document.querySelectorAll("button");
const div = document.querySelector("div");
button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const selection = e.target.id;
    const result = playRound(selection.toUpperCase(), getComputerChoice());
    console.log(result);
    if (human_score === 5) {
      div.textContent = `Final Score: You vs Computer ${human_score} - ${computer_score} YOU WIN!!!`;
      human_score = computer_score = 0;
    } else if (computer_score === 5) {
      div.textContent = `Final Score: You vs Computer ${human_score} - ${computer_score} Computer WINS!!!`;
      human_score = computer_score = 0;
    } else {
      div.textContent = `${result} Score: You vs Computer ${human_score} - ${computer_score}`;
    }
  });
});
