let player1Hand = [];
let player2Hand = [];
let scoreDiff;
let gameEnd = true;

const deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const symbols = ['♥', '♦', '♣', '♠'];

const gameInfo = document.createElement('div');
const cardContainer1 = document.createElement('div');
const cardContainer2 = document.createElement('div');
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
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
    title: `${cardName} of ${suits[suit]}`,
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
  gameInfo.innerHTML += `<br>${message}`;
};

const player1Click = (event) => {
  player1Button.disabled = true;
  setTimeout(() => {
    if (player1Hand.length < drawCount.value) {
      player1Button.disabled = false; }
  }, 500);
  // if end game reached, clear hands and boards and re-start
  if (gameEnd) {
    gameInfo.innerHTML = '';
    cardContainer1.innerText = '';
    cardContainer2.innerText = '';
    player1Hand = [];
    player2Hand = [];
    drawCount.disabled = true;
    gameEnd = false;
    scoreDiff = 0;
  }
  if (player1Hand.length < drawCount.value) {
  // draw and add card to hand
    const card = deal();
    player1Hand.push(card);
    cardContainer1.innerText = '';
    const cardElement = printHand(player1Hand);
    cardContainer1.appendChild(cardElement);
    output(`Player 1 draws the <strong>${card.title}</strong>.`);
  }
  if (player1Hand.length == drawCount.value) {
    const score = highLow(player1Hand);
    scoreDiff += score;
    cardContainer1.innerText = '';
    const cardElement = printHand(player1Hand);
    cardContainer1.appendChild(cardElement);
    output(`Player 1's largest difference is <strong>${score}</strong>.`);
    player1Button.disabled = true;

    if (player2Hand.length == drawCount.value) {
      gameEnd = true;
      drawCount.disabled = false;
      player1Button.disabled = false;
      player2Button.disabled = false;
      if (scoreDiff > 0) {
        output(`Player 1 wins by ${scoreDiff}!`);
      } else if (scoreDiff < 0) {
        output(`Player 2 wins by ${Math.abs(scoreDiff)}!`);
      } else {
        output('Tie!');
      }
    }
  }
};

const player2Click = (event) => {
  player2Button.disabled = true;
  setTimeout(() => {
    if (player2Hand.length < drawCount.value) {
      player2Button.disabled = false; }
  }, 500);
  // if end game reached, clear hands and boards and re-start
  if (gameEnd) {
    gameInfo.innerHTML = '';
    cardContainer1.innerText = '';
    cardContainer2.innerText = '';
    player1Hand = [];
    player2Hand = [];
    drawCount.disabled = true;
    gameEnd = false;
    scoreDiff = 0;
  }
  if (player2Hand.length < drawCount.value) {
  // draw and add card to hand
    const card = deal();
    player2Hand.push(card);
    cardContainer2.innerText = '';
    const cardElement = printHand(player2Hand);
    cardContainer2.appendChild(cardElement);
    output(`Player 2 draws the <strong>${card.title}</strong>.`);
  }
  if (player2Hand.length == drawCount.value) {
    const score = highLow(player2Hand);
    scoreDiff -= score;
    cardContainer2.innerText = '';
    const cardElement = printHand(player2Hand);
    cardContainer2.appendChild(cardElement);
    output(`Player 2's largest difference is <strong>${score}</strong>.`);
    player2Button.disabled = true;

    if (player1Hand.length == drawCount.value) {
      gameEnd = true;
      drawCount.disabled = false;
      player1Button.disabled = false;
      player2Button.disabled = false;
      if (scoreDiff > 0) {
        output(`<strong>Player 1 wins by ${scoreDiff}!</strong>`);
      } else if (scoreDiff < 0) {
        output(`<strong>Player 2 wins by ${Math.abs(scoreDiff)}!</strong>`);
      } else {
        output('<strong>Tie!</strong>');
      }
      output('Draw to start a new game!');
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
    card.classList.add('high-low');
  }

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const initGame = () => {
  scoreDiff = 0;
  makeDeck();

  const mainContainer = document.createElement('div');
  mainContainer.id = 'main-container';
  const player1Container = document.createElement('div');
  const player2Container = document.createElement('div');
  player1Container.classList.add('player1');
  player2Container.classList.add('player2');
  mainContainer.appendChild(player1Container);
  mainContainer.appendChild(player2Container);
  document.body.appendChild(mainContainer);

  player1Button.className = 'button';

  player2Button.className = 'button';

  gameInfo.className = 'output';

  cardContainer1.classList.add('card-container');
  cardContainer2.classList.add('card-container');

  player1Container.appendChild(cardContainer1);
  player2Container.appendChild(cardContainer2);

  mainContainer.appendChild(gameInfo);
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  player1Container.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  player2Container.appendChild(player2Button);

  drawCount.type = 'number';
  drawCount.min = '2';
  drawCount.max = '5';
  drawCount.value = 2;
  drawCount.style = 'text-align:center';
  document.body.appendChild(drawCount);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Decide on how many cards to draw, click draw to start the game!';
};

initGame();
