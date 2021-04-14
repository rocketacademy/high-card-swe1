import { buildDOM } from "./buildDom.js";
import { shuffledDeck } from "./createDeck.js";
import { compareCurrentScore, compareFinalScore } from "./helperFn.js";
console.log(shuffledDeck);

// Build DOM
buildDOM();

// Ge in DOM Elements
const playerOneRank = document.querySelector(".cardDrawRank1");
const playerOneSuit = document.querySelector(".cardDrawSuit1");
const playerTwoRank = document.querySelector(".cardDrawRank2");
const playerTwoSuit = document.querySelector(".cardDrawSuit2");
const playerOneScoreHeader = document.querySelector(".playerOneScoreHeader");
const playerTwoScoreHeader = document.querySelector(".playerTwoScoreHeader");
const playerOneCardDOM = document.querySelector(".cardDrawDiv1");
const playerTwoCardDOM = document.querySelector(".cardDrawDiv2");
const player1Button = document.querySelector(".player1Button");
const player2Button = document.querySelector(".player2Button");
const startButton = document.querySelector(".start-button");

// New Deck
const newDeck = shuffledDeck;

// Player Deck
let playerOneDeck = [];
let playerTwoDeck = [];

// Players Current Card
let playerOneCurrentCard;
let playerTwoCurrentCard;

// Player scores to end game
let playerOneFinalScore = 0;
let playerTwoFinalScore = 0;

// Player turn
let playerTurn = 0;

// Game started or no
let gameStarted = false;

// Init Game Function
const initGame = () => {
  gameStarted = true;
  playerTurn = 1;
  player1Button.disabled = false;
  playerOneCurrentCard = null;
  playerTwoCurrentCard = null;
  playerOneCardDOM.style.display = "none";
  playerTwoCardDOM.style.display = "none";
  playerOneFinalScore = 0;
  playerTwoFinalScore = 0;
  playerOneScoreHeader.innerText = playerOneFinalScore;
  playerTwoScoreHeader.innerText = playerTwoFinalScore;
  startButton.style.display = "none";
};

// Init Game
startButton.addEventListener("click", (e) => {
  initGame();
});

// Player One Draw card button
player1Button.addEventListener("click", (e) => {
  if (!gameStarted) {
    alert("Start game first");
  } else if (
    playerTurn === 1 &&
    newDeck.length &&
    !playerOneCurrentCard &&
    gameStarted
  ) {
    playerTurn = 2;
    playerOneCardDOM.style.display = "block";
    playerTwoCurrentCard = null;
    playerOneDeck.push(newDeck.pop());
    playerOneCurrentCard = playerOneDeck[playerOneDeck.length - 1];
    playerOneRank.innerText = playerOneDeck[playerOneDeck.length - 1].rank;
    playerOneSuit.innerText = playerOneDeck[playerOneDeck.length - 1].suit;
    console.log("palyer one deck", playerOneDeck);
    console.log("player ONE CURRENT CARD ", playerOneCurrentCard);
  } else if (playerTurn != 1) {
    alert("Player 2 turn");
  } else if (!newDeck.length) {
    compareFinalScore(playerOneFinalScore, playerTwoFinalScore, initGame);
    startButton.style.display = "block";
    // alert("Compare cards player one function");
  } else if (playerOneCurrentCard) {
    playerTurn = 2;
  }
});

// Player TWO Draw card button
player2Button.addEventListener("click", (e) => {
  if (!gameStarted) {
    alert("Start game first");
  } else if (
    playerTurn === 2 &&
    newDeck.length &&
    !playerTwoCurrentCard &&
    gameStarted
  ) {
    playerTwoCardDOM.style.display = "block";
    playerTurn = 1;
    playerTwoDeck.push(newDeck.pop());
    playerTwoCurrentCard = playerTwoDeck[0];
    playerTwoRank.innerText = playerTwoDeck[playerTwoDeck.length - 1].rank;
    playerTwoSuit.innerText = playerTwoDeck[playerTwoDeck.length - 1].suit;
    console.log("player two deck", playerTwoDeck);
    console.log("player two CURRENT CARD ", playerTwoCurrentCard);
    console.log("DECK LENGTH ---> ", newDeck.length);

    // check if there is current card on hand, if so compare ranks
    if (playerOneCurrentCard) {
      console.log("PlayeroneCurrentCard", playerOneCurrentCard);
      const whoScores = compareCurrentScore(
        playerOneCurrentCard.rank,
        // playerTwoCurrentCard.rank
        playerTwoDeck[playerTwoDeck.length - 1].rank,
        initGame
      );
      console.log("this is compare fn", whoScores);
      if (whoScores) {
        playerOneFinalScore += 1;
        playerOneScoreHeader.innerText = playerOneFinalScore;
        // alert("Player one scores");
      } else {
        playerTwoFinalScore += 1;
        playerTwoScoreHeader.innerText = playerTwoFinalScore;
        // alert("Player Two scores");
      }
      playerOneCurrentCard = null;
    }
  } else if (playerTurn != 2) {
    alert("Player 1 turn");
  } else if (!newDeck.length) {
    compareFinalScore(playerOneFinalScore, playerTwoFinalScore, initGame);
    startButton.style.display = "block";
    gameStarted = false;
  } else if (playerTwoCurrentCard) {
    playerTurn = 1;
  } else if (!gameStarted) {
    alert("Start game first");
  }

  console.log("FINAL ", playerOneFinalScore);
  // if (playerOneFinalScore > 3) {
  //   // initGame();
  //   location.reload();
  // }
});
