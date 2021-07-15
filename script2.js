// Global set up
const deck = [];
const player1Button = document.createElement("button");
const player2Button = document.createElement("button");
const gameInfo = document.createElement("div");

let playersTurn = 1; // matches with starting instructions
let player1Card;

// cardContainer DOM element as a global variable
let cardContainer;
cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
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
  }
  if (cardRank == 11) {
    cardName = "Jack";
    cardDisplay = "J";
  }
  if (cardRank == 12) {
    cardName = "Queen";
    cardDisplay = "Q";
  }
  if (cardRank == 13) {
    cardName = "King";
    cardDisplay = "K";
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

  // create card DOM object - create suit and cardName elements, and append them to card element
  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suitSymbol;

  const cardName = document.createElement("div");
  cardName.classList.add(cardInfo.displayName, cardInfo.colour);
  cardName.innerText = cardInfo.rank;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(cardName);
  card.appendChild(suit);

  //return card DOM object
  return card;
};

const makeDeck = () => {
  let newDeck = [];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Loop over 13 ranks
    for (let rankIndex = 0; rankIndex <= 13; rankIndex++) {
      const newCard = makeCard(suitIndex, rankIndex);
      // Add the new DOM card object to the deck
      newDeck.push(newCard);
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
    player1Card = deck.pop();
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output("player 1 wins");
    } else if (player1Card.rank < player2Card.rank) {
      output("player 2 wins");
    } else {
      output("tie");
    }
  }
};

// Game initialisation
const initGame = () => {
  // initialize button functionality
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);

  player1Button.addEventListener("click", player1Click);
  player2Button.addEventListener("click", player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);
};
