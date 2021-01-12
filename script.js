// Function 1: get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// Function 2: cards is an array of card objects
const shuffleCards = (cards) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cards;
};

// Function 3: Create the deck
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayVal = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayVal = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayVal = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayVal = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayVal = 'K';
      }

      // colour
      let currentColour = '';
      if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
        currentColour = 'red';
      } else {
        currentColour = 'black';
      }

      // symbol
      let suitSymbol = '';
      if (currentSuit === 'hearts') { suitSymbol = '♥'; }
      else if (currentSuit === 'diamonds') { suitSymbol = '♦️'; }
      else if (currentSuit === 'clubs') { suitSymbol = '♣'; }
      else if (currentSuit === 'spades') { suitSymbol = '♠'; }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: currentColour,
        display: displayVal,
        symbol: suitSymbol,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

// Global Setup
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // Player 1 starts first
let player1Card; // Use let for player1Card object because player1Card will be reassigned

const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');
const cardTable = document.createElement('div');
const cardContainer = document.createElement('div');
const buttonsContainer = document.createElement('div');

// Function 4: Game Initialization
const initGame = () => {
  // Create page layout
  document.body.appendChild(cardTable);
  document.body.appendChild(buttonsContainer);
  cardTable.appendChild(cardContainer);
  cardTable.appendChild(gameInfo);
  cardTable.classList.add('table');
  buttonsContainer.classList.add('buttonsContainer');

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  gameInfo.classList.add('textbox');

  // create two buttons
  player1Button.innerText = 'Player 1 Draw';
  player1Button.classList.add('button');
  buttonsContainer.appendChild(player1Button);
  player1Button.addEventListener('click', player1Click);

  player2Button.innerText = 'Player 2 Draw';
  player2Button.classList.add('button');
  buttonsContainer.appendChild(player2Button);
  player2Button.addEventListener('click', player2Click);
};

// Function 5: Create card object
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  // name.classList.add(cardInfo.display);
  name.innerText = cardInfo.display;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = '';
  gameInfo.innerText = message;
};

// Player Action Callback functions
const player1Click = () => {
  if (playersTurn === 1) {
    cardContainer.innerHTML = '';

    player1Card = deck.pop();
    cardContainer.appendChild(createCard(player1Card));
    playersTurn = 2;
    output('Player 2 turn');
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    cardContainer.appendChild(createCard(player2Card));
    playersTurn = 1;

    // const endMsg = " Player 1 can draw to continue"

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};

initGame();
