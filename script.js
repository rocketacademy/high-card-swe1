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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;
      let colour = '';
      if (suitIndex <= 1) {
        colour = 'red';
      }
      else {
        colour = 'black';
      }
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const cardInfo = {
        name: cardName,
        displayName: cardDisplayName,
        suit: currentSuit,
        rank: rankCounter,
        cardColour: colour,
        suitSymbol: currentSuitSymbol,
      };

      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;
let player2Card;

let player1HandRank = [];
let player2HandRank = [];

let player1HandLength = 0;
let player2HandLength = 0;

let canClick = true;
let cardContainer1;
let cardContainer2;
let inputMaxCards;
let submitButton;
// let maxCards = 0;
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.cardColour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.cardColour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  if (playersTurn === 1) {
    card.classList.add('P1', 'card');
  }
  else {
    card.classList.add('P2', 'card');
  }
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    // ONLY EXECUTE BELOW IF CURRENT CARDS(player1HandRank.length) IS LESS THAN LIMIT
    // Pop player 1's card metadata from the deck
    setTimeout(() => {
      player1Card = deck.pop();
      player1HandLength += 1;
      // Create card element from card metadata
      const cardElement = createCard(player1Card);
      // Append the card element to the card container
      cardContainer1.appendChild(cardElement);
      const p1CardOrder = cardElement.parentNode;
      console.log(p1CardOrder.childNodes);
      if (player1Card.rank > player1HandRank[0]) {
        cardElement.parentNode
          .insertBefore(p1CardOrder.lastChild, p1CardOrder.firstChild);
        if (player1HandLength >= 3) {
          cardElement.parentNode
            .insertBefore(p1CardOrder.childNodes[2],
              p1CardOrder.childNodes[1]);
        }
      }
      else if (player1Card.rank < player1HandRank[player1HandRank.length - 1]) {
        cardElement.parentNode
          .insertBefore(p1CardOrder.lastChild, p1CardOrder.firstChild.nextSibling);
      }
      // Switch to player 2's turn
      player1HandRank.push(player1Card.rank);
      playersTurn = 2;
      canClick = true;
      player1HandRank.sort((a, b) => b - a);
    }, 500);
  }
};
// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);
// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};
const player2Click = () => {
  if (playersTurn === 2) {
    canClick = false;
    // Pop player 2's card metadata from the deck
    setTimeout(() => {
      player2Card = deck.pop();
      player2HandLength += 1;
      // Create card element from card metadata
      const cardElement = createCard(player2Card);
      // Append card element to card container
      cardContainer2.appendChild(cardElement);

      const p2CardOrder = cardElement.parentNode;
      console.log(p2CardOrder);
      if (player2Card.rank > player2HandRank[0]) {
        cardElement.parentNode
          .insertBefore(p2CardOrder.lastChild, p2CardOrder.firstChild);
        if (player2HandLength >= 3) {
          cardElement.parentNode
            .insertBefore(p2CardOrder.childNodes[2],
              p2CardOrder.childNodes[1]);
        }
      }
      else if (player2Card.rank < player2HandRank[player2HandRank.length - 1]) {
        cardElement.parentNode
          .insertBefore(p2CardOrder.lastChild, p2CardOrder.firstChild.nextSibling);
      }
      // Switch to player 1's turn
      playersTurn = 1;
      canClick = true;
      player2HandRank.push(player2Card.rank);
      player2HandRank.sort((a, b) => b - a);
    }, 500);
  }
};

const faceOffFunc = () => {
  if ((player1HandRank[0] - player1HandRank[player1HandRank.length - 1])
  > (player2HandRank[0] - player2HandRank[player2HandRank.length - 1])) {
    output('player 1 wins');
  } else if ((player1HandRank[0] - player1HandRank[player1HandRank.length - 1])
  < (player2HandRank[0] - player2HandRank[player2HandRank.length - 1])) {
    output('player 2 wins');
  } else {
    output('tie');
  }
  cardContainer1.innerHTML = '';
  cardContainer2.innerHTML = '';
  player1HandRank = [];
  player2HandRank = [];
  player1HandLength = 0;
  player2HandLength = 0;
};

const initGame = () => {
  // maxCards = inputMaxCards.value;
  cardContainer1 = document.createElement('div');
  cardContainer1.classList.add('card-container1');
  document.body.appendChild(cardContainer1);
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container2');
  document.body.appendChild(cardContainer2);
  // initialize button functionality
  const player1Button = document.createElement('button');
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  const player2Button = document.createElement('button');
  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  const faceOffButton = document.createElement('button');
  faceOffButton.innerText = 'Faceoff!';
  document.body.appendChild(faceOffButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  faceOffButton.addEventListener('click', faceOffFunc);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

const gameSetup = () => {
  inputMaxCards = document.createElement('input');
  inputMaxCards.type = 'text';
  document.body.appendChild(inputMaxCards);
  submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  submitButton.addEventListener('click', initGame);
  document.body.appendChild(submitButton);
};
gameSetup();
