player1CardValues = [];
player2CardValues = [];

let player1Card;

const player1Button = document.createElement("button");

const player2Button = document.createElement("button");

const obtainResultsButton = document.createElement("button");
obtainResultsButton.innerText = "Get Results";

const gameInfo = document.createElement("div");

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
let cardContainer;
let cardContainer1;
let cardContainer2;

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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["♥️", "♦️", "♣", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
      } else if (cardName === "11") {
        cardName = "jack";
      } else if (cardName === "12") {
        cardName = "queen";
      } else if (cardName === "13") {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suit;

  const name = document.createElement("div");
  name.classList.add(cardInfo.display, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};
const deck = shuffleCards(makeDeck());
const player1Click = () => {
  player1Card = deck.pop();
  player1CardValues.push(player1Card.rank);
  const cardElement = createCard(player1Card);

  // in case this is not the 1st time
  // in the entire app,
  // empty the card container
  gameInfo.innerHTML = "";

  cardContainer1.appendChild(cardElement);
};

const cardOutput = (message) => {
  gameInfo.innerText = message;
};

const player2Click = () => {
  const player2Card = deck.pop();
  player2CardValues.push(player2Card.rank);
  const cardElement = createCard(player2Card);
  cardContainer2.appendChild(cardElement);
};

const initGame = () => {
  // initialize button functionality
  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
  cardContainer1 = document.createElement("div");
  cardContainer1.classList.add("card-container");
  document.body.appendChild(cardContainer1);
  cardContainer2 = document.createElement("div");
  cardContainer2.classList.add("card-container");
  document.body.appendChild(cardContainer2);
  player1Button.innerText = "Player 1 Draw";
  cardContainer.appendChild(player1Button);

  player2Button.innerText = "Player 2 Draw";
  cardContainer.appendChild(player2Button);

  player1Button.addEventListener("click", () => {
    setTimeout(player1Click, 1000);
  });
  player2Button.addEventListener("click", () => {
    setTimeout(player2Click, 1000);
  });
  cardContainer.appendChild(obtainResultsButton);
  obtainResultsButton.addEventListener("click", evaluateGameResult);

  // fill game info div with starting instructions
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  cardContainer.appendChild(gameInfo);
};
const evaluateGameResult = () => {
  const player1Max = Math.max(...player1CardValues);
  const player1Min = Math.min(...player1CardValues);
  const player2Max = Math.max(...player2CardValues);
  const player2Min = Math.min(...player2CardValues);
  const player1Difference = player1Max - player1Min;
  const player2Difference = player2Max - player2Min;
  console.log(player1Difference);
  console.log(player2Difference);
  if (player1Difference === player2Difference) {
    gameInfo.innerHTML = "There is no winner";
  }
  player1Difference > player2Difference
    ? (gameInfo.innerHTML = "Congrats Player1")
    : (gameInfo.innerHTML = "Congrats Player2");
};
initGame();
