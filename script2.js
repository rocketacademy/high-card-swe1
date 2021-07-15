// Global set up
let shuffledDeck = [];
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");
const scoreBoard = document.createElement("div");

//player scores
let player1score = 0;
let player2score = 0;

let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

// //mainContainer DOM element as a global variable
// let mainContainer;
// mainContainer = document.createElement("div");
// mainContainer.classList.add("container");
// document.body.appendChild(mainContainer);

// cardContainer DOM element as a global variable
let cardContainer;
cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
// append cardContainer to mainContainer
document.body.appendChild(cardContainer);

// card information
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const symbols = ["♥", "♦", "♣", "♠"];

// Helper functions
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeCard = (cardSuit, cardRank) => {
  let cardName = "";
  let cardDisplay = "";

  if (cardRank == 1) {
    cardName = "Ace";
    cardDisplay = "A";
  } else if (cardRank == 11) {
    cardName = "Jack";
    cardDisplay = "J";
  } else if (cardRank == 12) {
    cardName = "Queen";
    cardDisplay = "Q";
  } else if (cardRank == 13) {
    cardName = "King";
    cardDisplay = "K";
  } else {
    //Default:
    cardName = cardRank;
    cardDisplay = cardRank;
  }

  //create cardInfo object
  const cardInfo = {
    suitSymbol: symbols[cardSuit],
    suit: suits[cardSuit],
    name: cardName,
    displayName: cardDisplay,
    colour: "red",
    rank: cardRank,
  };

  console.log(cardInfo);

  //return cardInfo object
  return cardInfo;
};

const makeDeck = () => {
  let newDeck = [];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Loop over 13 ranks
    for (let rankIndex = 0; rankIndex < 13; rankIndex++) {
      const cardInfo = makeCard(suitIndex, rankIndex + 1);
      console.log(
        `getting card info for suitIndex ${suitIndex} and rankIndex ${rankIndex}`
      );

      // Add the new card object to the deck
      newDeck.push(cardInfo);
    }
  }
  // Return the completed card deck (i.e. an array of card DOM objects)
  return newDeck;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Player action call backs
const player1Click = () => {
  if (playersTurn === 1) {
    // Pop player 1's card metadata from the deck
    player1Card = shuffledDeck.pop();
    // Create card element from card metadata: create card DOM object - create suit and cardName elements, and append them to card element
    const suit = document.createElement("div");
    suit.classList.add("suit");
    suit.innerText = player1Card.suitSymbol;

    const name = document.createElement("div");
    console.log(`display name of card: ${player1Card.displayName}`);
    console.log(`colour of card: ${player1Card.colour}`);
    name.classList.add("name", player1Card.colour);
    name.innerText = player1Card.displayName;

    const card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(name);
    card.appendChild(suit);

    // Empty cardContainer in case this is not the 1st round of gameplay
    cardContainer.innerHTML = "";

    // If this is the first round, display the card
    cardContainer.appendChild(card);

    // Switch to player 2's turn
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = shuffledDeck.pop();
    playersTurn = 1;

    // Create card element from card metadata: create card DOM object - create suit and cardName elements, and append them to card element
    const suit = document.createElement("div");
    suit.classList.add("suit");
    suit.innerText = player2Card.suitSymbol;

    const name = document.createElement("div");
    console.log(`display name of card: ${player2Card.displayName}`);
    console.log(`colour of card: ${player2Card.colour}`);
    name.classList.add("name", player2Card.colour);
    name.innerText = player2Card.displayName;

    const card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(name);
    card.appendChild(suit);

    // display the card
    cardContainer.appendChild(card);

    // winning conditions
    // If player1card has a higher rank, output that they win and increment score
    if (player1Card.rank > player2Card.rank) {
      output("player 1 wins");
      player1score += 1;
    } else if (player1Card.rank < player2Card.rank) {
      output("player 2 wins");
      player2score += 1;
    } else {
      output("tie");
    }
  }
};

// Game initialisation
const initGame = () => {
  // Make deck
  const newDeck = makeDeck();

  // Shuffle deck
  shuffledDeck = shuffleCards(newDeck);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  gameInfo.classList.add("output");
  document.body.appendChild(gameInfo);

  // initialize button functionality
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  document.body.appendChild(buttonContainer);

  player1Button.innerText = "Player 1 Draw";
  buttonContainer.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  buttonContainer.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);
};

initGame();

// Output scoreboard
scoreBoard.innerText = `Scoreboard: Player 1: ${player1score}  Player 2: ${player2score}`;
scoreBoard.classList.add("score-board");
document.body.appendChild(scoreBoard);
