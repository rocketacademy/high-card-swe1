//= ======================================================
let playersTurn = 1; // matches with starting instructions
const player1Card = [];
const player2Card = [];
let canClick = true;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const submitButton = document.createElement('button');

const compareButton = document.createElement('button');

const gameInfo = document.createElement('div');
gameInfo.classList.add('gameInfo');

//= ======================================================
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

//= ======================================================
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

//= ======================================================
// Make a deck
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    let color = '';
    let suitSymbol = suitIndex;
    if (suitSymbol === 0) {
      suitSymbol = '♥';
      color = 'red';
    } else if (suitSymbol === 1) {
      suitSymbol = '♦';

      color = 'red';
    } else if (suitSymbol === 2) {
      suitSymbol = '♣';
      color = 'black';
    } else if (suitSymbol === 3) {
      suitSymbol = '♠';
      color = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      let display = '';
      display = rankCounter;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        display = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        display = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        display = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        display = 'K';
      }

      // make a single card object variable
      const card = {
        suitSymbol,
        name: cardName,
        display,
        color,
        suit: currentSuit,
        rank: rankCounter,
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};
const deck = shuffleCards(makeDeck());

// =========================================================
const output = (message) => {
  gameInfo.innerText = message;
};

// ========create card====================================
const createCard = (cardInfo) => {
  console.log('card info is');
  console.log(cardInfo);
  const card = document.createElement('div');

  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.display);
  name.innerText = cardInfo.display;

  // const card = document.createElement('div');
  card.classList.add('card', cardInfo.color);
  // card.classList.add('cardFormat');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

//= ======================================================

let cardContainer;
cardContainer = document.createElement('div');
document.body.appendChild(cardContainer);

//= ============find the highest card in both players' hand=================================
const identifyLargestCardInArray = (playerCardArray) => {
  let largestCard = playerCardArray[0];
  for (let i = 0; i < playerCardArray.length; i += 1) {
    const currentCard = playerCardArray[i];
    console.log(`current card is ${currentCard.name} of ${currentCard.suit}`);

    if (currentCard.rank > largestCard.rank) {
      largestCard = currentCard;
    }
  }
  return largestCard;
};
//= ============find the lowest card in both players' hand=================================
const identifyLowestCardInArray = (playerCardArray) => {
  let lowestCard = playerCardArray[0];
  for (let i = 0; i < playerCardArray.length; i += 1) {
    const currentCard = playerCardArray[i];
    console.log(`current card is ${currentCard.name} of ${currentCard.suit}`);

    if (currentCard.rank < lowestCard.rank) {
      lowestCard = currentCard;
    }
  }
  return lowestCard;
};

//= ============get winner=================================

// if player 1's largest card is bigger than player 2's, AND

// Either play wins by highest/lowest cards:
// Applies to either player: player1's smallest card is smaller than player 2'
// then player 1 wins
const getWinner = (player1LargestCard, player1lowestCard, player2largestCard, player2lowestCard) => {
  let myOutputValue = '';
  if ((player1LargestCard.rank > player2largestCard.rank) && (player1lowestCard.rank < player2lowestCard.rank)) {
    myOutputValue = 'player 1 wins!';
  } else if ((player2largestCard.rank > player1largestCard.rank) && (player2lowestCard.rank < player1lowestCard.rank)) {
    myOutputValue = 'player 2 wins!';
  } else if ((player1LargestCard.rank - player1lowestCard.rank) > (player2largestCard.rank - player2lowestCard.rank)) {
    myOutputValue = 'player 1 wins!';
  } else if ((player2LargestCard.rank - player2lowestCard.rank) > (player1largestCard.rank - player1lowestCard.rank)) {
    myOutputValue = 'player 2 wins!';
  } else {
    myOutputValue = 'It\'s a tie';
  }
  return myOutputValue;
};

// win/lose conditions
// XXXX

//= ======================================================
const player1Click = () => {
  let cardElement = '';

  // // in case, if this is not the 1st time
  // // in the entire app,
  // // empty the card container
  // cardContainer.innerHTML = '';
  // console.log('card container contains');
  // console.log(cardContainer);
  // delay the creation of Player 1's card by 2 secs
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1Card.push(deck.pop());
      cardElement = createCard(player1Card[player1Card.length - 1]);
      cardContainer.appendChild(cardElement);
      // in case, if this is not the 1st time
      // in the entire app,
      // empty the card container
      // cardContainer.innerHTML = '';

      canClick = true;
    }, 2000);
  }
};

//= ======================================================

const player2Click = () => {
  console.log('it\'s player 2\'s turn');
  if (playersTurn === 2 && canClick === true) {
    canClick = false;
    let cardElement = '';

    setTimeout(() => {
      player2Card.push(deck.pop());
      cardElement = createCard(player2Card[player2Card.length - 1]);
      cardContainer.appendChild(cardElement);

      // playersTurn = 1;
      canClick = true;

      // if (player1Card.rank > player2Card.rank) {
      //   output('player 1 wins');
      // } else if (player1Card.rank < player2Card.rank) {
      //   output('player 2 wins');
      // } else {
      //   output('tie');
      // }
    }, 2000);
  }
};
//= ====================================
const comparingClick = () => {
  if (playersTurn === 3) {
    console.log('comparing cards...');
    const player1LargestCard = identifyLargestCardInArray(player1Card);
    const player2largestCard = identifyLargestCardInArray(player2Card);
    const player1lowestCard = identifyLowestCardInArray(player1Card);
    const player2lowestCard = identifyLowestCardInArray(player2Card);

    const outcome = getWinner(player1LargestCard, player1lowestCard, player2largestCard, player2lowestCard);
    console.log(outcome);
    output(outcome);
  }
};
//= ======================================================
const cardOutput = (message) => {
  gameInfo.innerText = message;
};

//= ======================================================
const gameInit = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  submitButton.innerText = 'submit!';
  document.body.appendChild(submitButton);

  compareButton.innerText = 'Compare!';
  document.body.appendChild(compareButton);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
  submitButton.addEventListener('click', () => { playersTurn = 2; });
  compareButton.addEventListener('click', () => { playersTurn = 3; comparingClick(); });

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement('div');
  document.body.appendChild(cardContainer);
};

gameInit();
