
// const prompt = require("prompt-sync")({
//   input: process.stdin,
//   output: process.stdout,
// });

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
            console.log("Invalid entry!!! Try again...")
        }
            
    }
    
}

function playRound(human_choice, computer_choice) {

    console.log(`Your choice is ${human_choice}`);
    console.log(`Computer's choice is ${computer_choice}`);
    if (human_choice == computer_choice) {
        console.log("It's a TIE!");
        tie_score++;
        return;
    }
    if (win_conditions[human_choice] === computer_choice) {
        console.log(`You WIN! ${human_choice} beats ${computer_choice}`);
        human_score++;
    } else {
        console.log(`Computer WINS! ${computer_choice} beats ${human_choice}`);
        computer_score++;
    }

}

function playGame() {

  for (let round = 1; round <= 5; round++) {
    console.log("Round " + round);   
    playRound(getHumanChoice(), getComputerChoice());
  }
    console.log(`Final Score: Human vs Computer ${human_score} - ${computer_score} - ${tie_score}`);
    if (human_score > computer_score) {
        console.log("Hooray! YOU WIN!!!");
    } else if (computer_score > human_score) {
        console.log("YOU LOSE!")
    } else {
        console.log("IT'S A TIE!!!")
    }
}
let human_score = computer_score = tie_score = 0;

console.log("Let's play Rock, Paper, Scissors");

playGame();



