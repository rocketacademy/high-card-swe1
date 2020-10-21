// Global Variables
let cardContainerP1;
let cardContainerP2;

const playersTurn = 1; // matches with starting instructions

let player1Card; // don't use const for this player card object

let gameState; // use this to determine whether to rearrange cards

const player1Hand = [];
const player2Hand = [];
const combPlayerHand = [];
let sortedHand = [];
let numOfCards = 0;

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

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

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

      // make a single card object variable
      const card = {
        name: cardName,
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

// create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
document.body.appendChild(gameInfo);

// don't write the dom manipulation
// code inline in the conditional
// create a helper function for output
const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = (number) => {
  console.log('player1click');
  console.log(number);
  let cardElement;
  // in case this is not the 1st time
  // in the entire app,
  // empty the card container

  // cardContainer.innerHTML = '';

  if (player1Hand.length < number) {
    console.log(player1Hand.length, 'player1Hand');
    const player1Card = deck.pop();
    player1Hand.push(player1Card);
    console.log(player1Hand);
    // Adding symbol and suitSymbol attributes to player1Card through buildCard
    cardElement = createCard(buildCard(player1Card));
    console.log('player1click');
    cardContainerP1.appendChild(cardElement);

    // evaluate game
    evaluateGame(number);
  }
};

const player2Click = (number) => {
  if (player2Hand.length < number) {
    const player2Card = deck.pop();
    player2Hand.push(player2Card);
    const cardElement = createCard(buildCard(player2Card));
    cardContainerP2.appendChild(cardElement);

    // evaluate game
    evaluateGame(number);
  }
};

const evaluateGame = (number) => {
  if (player1Hand.length === 1 && player2Hand.length === 1) {
    if (player1Hand[0].rank > player2Hand[0].rank) {
      output('player 1 wins');
    } else if (player2Hand[0].rank > player1Hand[0].rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  } else if (player1Hand.length === number && player2Hand.length === number) {
    const sortedP1Hand = player1Hand.sort((a, b) => b.rank - a.rank);
    const newDiffP1 = sortedP1Hand[0].rank - sortedP1Hand[sortedP1Hand.length - 1].rank;
    console.log(newDiffP1, 'newDiffP1');

    const sortedP2Hand = player2Hand.sort((a, b) => b.rank - a.rank);
    const newDiffP2 = sortedP2Hand[0].rank - sortedP2Hand[sortedP2Hand.length - 1].rank;
    console.log(newDiffP2, 'newDiffP2');

    if (newDiffP1 > newDiffP2) {
      output('player 1 wins');
    } else if (newDiffP1 < newDiffP2) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};

const gameInit = () => {
  // create two buttons
  const player1Button = document.createElement('button');
  const player2Button = document.createElement('button');

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', () => player1Click(numOfCards));
  player2Button.addEventListener('click', () => player2Click(numOfCards));

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  cardContainerP1 = document.createElement('div');
  cardContainerP1.classList.add('card-container1');

  const player1Label = document.createElement('div');
  player1Label.innerHTML = 'Player 1\'s Hands';
  cardContainerP1.appendChild(player1Label);

  cardContainerP2 = document.createElement('div');
  cardContainerP2.classList.add('card-container2');

  const player2Label = document.createElement('div');
  player2Label.innerHTML = 'Player 2\'s Hands';
  cardContainerP2.appendChild(player2Label);

  document.body.appendChild(cardContainerP1);
  document.body.appendChild(cardContainerP2);
};

// Global variable/object
const theCard = {
  suitSymbol: '♦️',
  suit: 'diamond',
  name: 'queen',
  display: 'Q',
  color: 'red',
  rank: 12,
};

const createCard = (cardInfo) => {
  console.log(cardInfo, 'see value of CardInfo');
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.display, cardInfo.color);
  name.innerText = cardInfo.display;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Helper function to build card display
const buildCard = (cardObj) => {
  let symbolX;
  let colorX;
  let displayX;

  if (cardObj.suit === 'diamonds') {
    symbolX = '♦️';
    colorX = 'red';
  } else if (cardObj.suit === 'hearts') {
    symbolX = '❤️';
    colorX = 'red';
  } else if (cardObj.suit === 'spades') {
    symbolX = '♠️';
    colorX = 'black';
  } else {
    symbolX = '♣️';
    colorX = 'black';
  }

  if (cardObj.name === 'jack') {
    displayX = 'J';
  } else if (cardObj.name === 'queen') {
    displayX = 'Q';
  } else if (cardObj.name === 'king') {
    displayX = 'K';
  } else if (cardObj.name === 'ace') {
    displayX = 'A';
  } else {
    displayX = cardObj.name;
  }

  cardObj.suitSymbol = symbolX;
  cardObj.color = colorX;
  cardObj.display = displayX;
  //   cardObj.display = 'z';
  return cardObj;
};

// Helper Function to rearrange cards to display the 2 cards with the highest score
const rearrangeCards = () => {
  // Creating the Rearrange button
  const newButton = document.createElement('button');
  newButton.setAttribute('id', '#rearrange');
  newButton.innerHTML = 'Rearrange';

  // Creating the container for the rearranged cards
  const rearrangeCardsContainer = document.createElement('div');
  rearrangeCardsContainer.classList.add('card-container3');

  document.body.append(newButton);
  document.body.appendChild(rearrangeCardsContainer);

  newButton.addEventListener('click', () => {
    combPlayerHand.length = 0;
    rearrangeCardsContainer.innerHTML = '';

    // recreate all the cards below
    for (let i = 0; i < player1Hand.length; i += 1) {
      combPlayerHand.push(player1Hand[i]);
      combPlayerHand.push(player2Hand[i]);
    }
    sortedHand = combPlayerHand.sort((a, b) => b.rank - a.rank);
    // For each new card, append it to cardContainer as a child again:
    for (let j = 0; j < sortedHand.length; j += 1) {
      const revisedCard = createCard(buildCard(sortedHand[j]));
      rearrangeCardsContainer.appendChild(revisedCard);
    }
  });
  // http://www.mattmorgante.com/technology/javascript-sort-compare -- how to use sort function on an array of objects
};

// //Helper Function to remove elements

// Initialize the game
const insertNewInputBox = () => {
  const newInput = document.createElement('input');
  newInput.setAttribute('id', '#new-input');
  newInput.setAttribute('placeholder', 'Enter number of Cards to be Drawn');

  const newButton = document.createElement('button');
  newButton.setAttribute('id', '#new-button');
  newButton.innerHTML = 'Enter';

  newButton.addEventListener('click', () => {
    numOfCards = Number(newInput.value);
    console.log(numOfCards);
    gameInfo.innerText = `You have entered ${numOfCards} cards to be drawn.`;
  });

  document.body.appendChild(newInput);
  document.body.appendChild(newButton);
};

// Get input from user

// create new input box
insertNewInputBox();

// initialize game
gameInit();

// rearrangeCards
rearrangeCards();
