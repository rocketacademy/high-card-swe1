/* eslint-disable prefer-const */
let playersTurn = 1; // matches with starting instructions
let player1Card;
let player2Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// cards is an array of card objects
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

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);
    let colorType;
    let suitSymbol;
    if (suitIndex == 0) {
      suitSymbol = '❤';
      colorType = 'red';
    } else if (suitIndex == 1) {
      suitSymbol = '◆';
      colorType = 'red';
    } else if (suitIndex == 2) {
      suitSymbol = '♣️';
      colorType = 'black';
    } else {
      suitSymbol = '♠️';
      colorType = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      if (cardName === 'ace') {
        displayName = 'A';
      } else if (cardName === 'jack') {
        displayName = 'J';
      } else if (cardName === 'queen') {
        displayName = 'Q';
      } else if (cardName === 'king') {
        displayName = 'K';
      } else {
        displayName = cardName;
      }

      // make a single card object variable
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: suitSymbol,
        color: colorType,
        display: displayName,
      };

      console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};
let cardContainer = '';
let cardContainer2 = '';
let player1HandRank = [];
let player1Hand = [];
let player2HandRank = [];
let player2Hand = [];
let p1CardCounter = 0;
let p2CardCounter = 0;

const output = (message) => {
  gameInfo.innerText = message;
};
const deck = shuffleCards(makeDeck());
// create card
const createCard = (cardInfo, playerTag) => {
  const symbol = document.createElement('div');
  symbol.classList.add('suit');
  symbol.classList.add(cardInfo.display, cardInfo.color);
  symbol.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.display, cardInfo.color);
  name.innerText = cardInfo.name;

  const player = document.createElement('div');
  player.innerText = '';

  const card = document.createElement('div');
  card.classList.add('card');
  if (playerTag == 1) {
    card.setAttribute('id', 'pOne' + p1CardCounter);
  } else {
    card.setAttribute('id', 'pTwo' + p2CardCounter);
  }
  card.appendChild(name);
  card.appendChild(symbol);

  return card;
};

const findLargestCardInHand = (playerHand) => {
  let largest = 0;
  let largestPosition = 0;
  for (let i = 0; i <= playerHand.length; i += 1) {
    if (playerHand[i] > largest) {
      largest = playerHand[i];
      largestPosition = i;
    }
  }
  console.log(largest + 'largest value');
  console.log(largestPosition + 'largest position');
  return largestPosition;
};
const findSmallestCardInHand = (playerHand) => {
  let smallest = 14;
  let smallestPosition = 0;
  for (let i = 0; i <= playerHand.length; i += 1) {
    if (playerHand[i] < smallest) {
      smallest = playerHand[i];
      smallestPosition = i;
    }
  }
  console.log(smallest + 'smallest value');
  console.log(smallestPosition + 'smallest position');
  return smallestPosition;
};
const displayArrangedHand = (playerTag) => {
  if (playerTag == 1) {
    for (let i = 0; i < player1Hand.length; i += 1) {
      let card = document.getElementById(`pOne${i}`);
      card.children[0].innerText = player1Hand[i].name;
      card.children[1].innerText = player1Hand[i].symbol;
      card.children[0].classList.remove('red');
      card.children[1].classList.remove('red');

      if (player1Hand[i].color == 'red') {
        card.children[0].classList.add('red');
        card.children[1].classList.add('red');
      }
    }
  } else {
    for (let i = 0; i < player2Hand.length; i += 1) {
      let card = document.getElementById(`pTwo${i}`);
      card.children[0].innerText = player2Hand[i].name;
      card.children[1].innerText = player2Hand[i].symbol;
      card.children[0].classList.remove('red');
      card.children[1].classList.remove('red');

      if (player2Hand[i].color == 'red') {
        card.children[0].classList.add('red');
        card.children[1].classList.add('red');
      }
    }
  }
};

const arrangePlayerHand = (playerHandRank, playerHand, playerTag) => {
  console.log(JSON.stringify(playerHand));
  let lHPosition = findLargestCardInHand(playerHandRank);
  let lHSplice = playerHand.splice(lHPosition, 1);
  let lHSpliceRank = playerHandRank.splice(lHPosition, 1);
  playerHand.splice(0, 0, ...lHSplice);
  playerHandRank.splice(0, 0, ...lHSpliceRank);
  let sHPosition = findSmallestCardInHand(playerHandRank);
  let sHSplice = playerHand.splice(sHPosition, 1);
  let sHSpliceRank = playerHandRank.splice(sHPosition, 1);
  playerHand.splice(0, 0, ...sHSplice);
  playerHandRank.splice(0, 0, ...sHSpliceRank);
  if (playerTag == 1) {
    player1Hand = playerHand;
    player1HandRank = playerHandRank;
    displayArrangedHand(1);
  } else {
    player2Hand = playerHand;
    player2HandRank = playerHandRank;
    displayArrangedHand(2);
  }
  console.log(JSON.stringify(playerHand) + 'final');
};

const checkWinner = () => {
  let p1Max = Math.max(...player1HandRank);
  let p1Min = Math.min(...player1HandRank);
  let p1Score = p1Max - p1Min;
  // arrangePlayerHand(player2HandRank, player2Hand);
  let p2Max = Math.max(...player2HandRank);
  let p2Min = Math.min(...player2HandRank);
  let p2Score = p2Max - p2Min;
  if (p1Score > p2Score) {
    gameInfo.innerText = 'Player 1 Wins';
  } else if (p1Score == p2Score) {
    gameInfo.innerText = 'Draw!';
  } else {
    gameInfo.innerText = 'Player 2 Wins';
  }
};

const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    player1HandRank.push(player1Card.rank);
    player1Hand.push(player1Card);
    const cardElement = createCard(player1Card, 1);
    // in case this is not the 1st time
    // in the entire app,
    // // empty the card container
    // cardContainer.innerHTML = '';
    cardContainer.appendChild(cardElement);
    gameInfo.innerText = 'Its player 2 turn. Click to draw a card!';
    playersTurn = 2;
    p1CardCounter += 1;
    arrangePlayerHand(player1HandRank, player1Hand, 1);
  }
};
const player2Click = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();
    player2HandRank.push(player2Card.rank);
    player2Hand.push(player2Card);
    const cardElement = createCard(player2Card, 2);
    cardContainer2.appendChild(cardElement);
    gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';

    playersTurn = 1;
    p2CardCounter += 1;
    arrangePlayerHand(player2HandRank, player2Hand, 2);
    if (p2CardCounter > 1) {
      checkWinner();
    }
  }
};

const cardOutput = (message) => {
  gameInfo.innerText = message;
};

const gameInit = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  // Player 1 Container
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
  const player1 = document.createElement('div');
  player1.innerText = 'Player1 hand';
  cardContainer.appendChild(player1);

  // Player 2 Container
  cardContainer2 = document.createElement('div');
  cardContainer2.classList.add('card-container');
  document.body.appendChild(cardContainer2);
  const player2Text = document.createElement('div');
  player2Text.innerText = 'Player2 hand';
  cardContainer2.appendChild(player2Text);
};

gameInit();
