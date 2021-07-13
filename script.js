let playersTurn; // matches with starting instructions
let player1Hand = [];
let player2Hand = [];
let scoreDiff;

const deck = [];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const symbols = ['♥', '♦', '♣', '♠'];

const gameInfo = document.createElement('div');
const cardContainer = document.createElement('div');
const drawCount = document.createElement('input');

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const generateCard = (cardRank, suit) => {
  let cardName = '';
  let cardDisplay = '';
  switch (cardRank) {
    case 1:
      cardName = 'Ace';
      cardDisplay = 'A';
      break;
    case 11:
      cardName = 'Jack';
      cardDisplay = 'J';
      break;
    case 12:
      cardName = 'Queen';
      cardDisplay = 'Q';
      break;
    case 13:
      cardName = 'King';
      cardDisplay = 'K';
      break;
    default:
      cardName = cardRank;
      cardDisplay = cardRank;
  }

  const cardColor = suit < 2 ? 'red' : 'black';

  const card = {
    suitSymbol: symbols[suit],
    suit: suits[suit],
    name: cardName,
    displayName: cardDisplay,
    colour: cardColor,
    rank: cardRank,
    title: `${cardName} of ${suit}`,
    highLow: false,
  };
  return card;
};

// generate a shuffled standard deck of cards
function makeDeck() {
  for (let i = 1; i <= 13; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      // generates cards and inserts randomly into deck
      deck.splice(getRandomIndex(deck.length + 1), 0, generateCard(i, j));
    }
  }
}
const deal = () => deck.pop();

const highLow = (playerHand) => {
  const ranks = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    ranks.push(playerHand[i].rank);
  }
  const highestCard = Math.max(...ranks);
  const lowestCard = Math.min(...ranks);
  playerHand[ranks.indexOf(highestCard)].highLow = true;
  playerHand[ranks.indexOf(lowestCard)].highLow = true;
  return highestCard - lowestCard;
};

// DOM output helper
const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (playersTurn === 1) {
    cardContainer.innerText = '';
    player1Hand = [];
    player2Hand = [];
    scoreDiff = 0;
    drawCount.disabled = true;
    for (let i = 0; i < drawCount.value; i += 1) {
      const card = deal();
      player1Hand.push(card);
    }
    scoreDiff += highLow(player1Hand);
    const cardElement = printHand(player1Hand);
    cardContainer.appendChild(cardElement);

    output('Player 2\'s turn!');
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    for (let i = 0; i < drawCount.value; i += 1) {
      const card = deal();
      player2Hand.push(card);
    }
    // Append the card element to the card container
    scoreDiff -= highLow(player2Hand);

    const cardElement = printHand(player2Hand);
    cardContainer.appendChild(cardElement);

    playersTurn = 1;
    drawCount.disabled = false;
    if (scoreDiff > 0) {
      output('Player 1 wins!');
    } else if (scoreDiff < 0) {
      output('Player 2 wins!');
    } else {
      output('Tie!');
    }
  }
};

const printHand = (playerHand) => {
  const hand = document.createElement('div');
  for (let i = 0; i < playerHand.length; i += 1) {
    hand.appendChild(printCard(playerHand[i]));
  }
  return hand;
};

const printCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');
  console.log(cardInfo);
  if (cardInfo.highLow) {
    console.log('here');
    card.classList.add('high-low');
  }

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const initGame = () => {
  playersTurn = 1;
  scoreDiff = 0;
  makeDeck();

  const player1Button = document.createElement('button');
  player1Button.className = 'button';
  const player2Button = document.createElement('button');
  player2Button.className = 'button';

  gameInfo.className = 'output';

  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  document.body.appendChild(gameInfo);
  // initialize button functionality
  const buttonDiv = document.createElement('div');
  player1Button.innerText = 'Player 1 Draw';
  buttonDiv.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonDiv.appendChild(player2Button);
  document.body.appendChild(buttonDiv);

  drawCount.type = 'number';
  drawCount.min = '2';
  drawCount.max = '5';
  drawCount.value = 2;
  drawCount.style = 'text-align:center';
  document.body.appendChild(drawCount);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'It\'s Player 1\'s turn. Click to draw a card!';
};

initGame();
