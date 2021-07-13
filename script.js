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
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSym = suitSymbols[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let dispName = `${rankCounter}`;
      let suitColor = 'black';

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        dispName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        dispName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        dispName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        dispName = 'K';
      }
      if (currentSuit === 'hearts' || currentSuit === 'diamonds')
      {
        suitColor = 'red';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSym,
        suit: currentSuit,
        name: cardName,
        displayName: dispName,
        colour: suitColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// ===GLOBALS===
const gameInfo = document.createElement('div');
let playersTurn = 1; // matches with starting instructions
let player1Cards = [];
let player2Cards = [];
let numCardsToDraw = 5;
let player1Wins = 0;
let player2Wins = 0;
let deck = shuffleCards(makeDeck());
let isStartOfGame = true;
const cardContainer1 = document.createElement('div');
const cardContainer2 = document.createElement('div');

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};
// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};
const drawMultipleCards = (num) =>
{
  const cards = [];
  for (let i = 0; i < num; i += 1)
  {
    const newCard = deck.pop();
    cards.push(newCard);
  }
  return cards;
};
const calcDifference = (cards) =>
{
  const cardRanks = cards.map((x) => x.rank);
  const diff = Math.max(...cardRanks) - Math.min(...cardRanks);
  return diff;
};

const orderCards = (cards) =>
{
  if (cards.length === 0)
  {
    return -1;
  }
  let maxIndex = 0;
  let minIndex = 0;

  let maxCard;
  let minCard;
  // get max index
  for (let i = 0; i < cards.length; i += 1)
  {
    const refCard = cards[i];
    maxCard = cards[maxIndex];

    if (refCard.rank > maxCard.rank)
    {
      maxIndex = i;
    }
  }
  cards.splice(maxIndex, 1);
  // get min index
  for (let i = 0; i < cards.length; i += 1)
  {
    const refCard = cards[i];
    minCard = cards[minIndex];

    if (refCard.rank < minCard.rank)
    {
      minIndex = i;
    }
  }

  cards.splice(minIndex, 1);

  cards.unshift(minCard);
  cards.unshift(maxCard);

  return cards;
};
const isEndGame = () =>
{
  if (deck.length < numCardsToDraw)
  {
    if (player1Wins > player2Wins)
    {
      output('Game has ended, player 1 wins!\nGame is restarted. Key in desired hand size');
    }
    else if (player2Wins > player1Wins)
    {
      output('Game has ended, player 2 wins!\nGame is restarted. Key in desired hand size');
    }
    else
    {
      output('Game has ended, players are tied\nGame is restarted. Key in desired hand size');
    }
    playersTurn = 1;
    deck = shuffleCards(makeDeck());
    cardContainer1.innerHTML = '';
    cardContainer2.innerHTML = '';
    isStartOfGame = true;
    return true;
  }
  return false;
};

const player1Click = () => {
  if (isEndGame())
  {
    return;
  }
  if (playersTurn === 1) {
    isStartOfGame = false;
    // Pop player 1's card metadata from the deck
    // const player1Card = deck.pop();
    cardContainer1.innerHTML = '';
    player1Cards = [];
    player1Cards = drawMultipleCards(numCardsToDraw);
    console.log(`num of cards ${player1Cards.length}`);
    player1Cards = orderCards(player1Cards);
    console.log(`num of cards ordered ${player1Cards.length}`);
    // Create card element from card metadata
    for (let i = 0; i < player1Cards.length; i += 1)
    {
      const cardElement = createCard(player1Cards[i]);
      cardContainer1.appendChild(cardElement);
    }
    // Switch to player 2's turn
    playersTurn = 2;
  }
};

const player2Click = () => {
  if (isEndGame())
  {
    return;
  }
  if (playersTurn === 2) {
    console.log('inPlayer2');

    cardContainer2.innerHTML = '';
    player2Cards = [];
    player2Cards = drawMultipleCards(numCardsToDraw);
    player2Cards = orderCards(player2Cards);
    // Pop player 2's card metadata from the deck
    for (let i = 0; i < player2Cards.length; i += 1)
    {
      const cardElement = createCard(player2Cards[i]);
      cardContainer2.appendChild(cardElement);
    }

    const oneMinusTwo = calcDifference(player1Cards) - calcDifference(player2Cards);

    // Switch to player 1's turn
    playersTurn = 1;

    // Determine and output winner
    if (oneMinusTwo > 0) {
      output('player 1 wins');
      player1Wins += 1;
    } else if (oneMinusTwo < 0) {
      output('player 2 wins');
      player2Wins += 1;
    } else {
      output('tie');
    }
  }
};
// ===DOM Manipulation===

const initGame = () => {
  // TODO: make textInput into function?
  const textInput = document.createElement('input');

  textInput.type = 'text';
  textInput.placeholder = 'key in handsize';
  textInput.size = '50';
  textInput.style.display = 'block';
  // get number of cards
  textInput.addEventListener('keyup', () =>
  {
    if (isStartOfGame) {
      textInput.placeholder = 'key in handsize';
      const number = Number(textInput.value);
      if (Number.isNaN(number))
      {
        textInput.value = '';
        textInput.placeholder = 'key in handsize';
      }
      numCardsToDraw = Number(textInput.value);
    }
    else {
      textInput.value = '';
      textInput.placeholder = 'handsize can only be decided at the start of the game.';
    }
  });

  const player1Button = document.createElement('button');
  const player2Button = document.createElement('button');

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  player2Button.innerText = 'Player 2 Draw';

  player1Button.addEventListener('click', player1Click);
  // textInput.remove(); only works in event listener
  // how to make textInput disappear when game is in progress and reappear when game is restarted?
  player1Button.addEventListener('click', player1Click);

  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';

  document.body.appendChild(cardContainer1);

  document.body.appendChild(cardContainer2);
  document.body.appendChild(player1Button);
  document.body.appendChild(player2Button);

  document.body.appendChild(gameInfo);
  document.body.appendChild(textInput);
};

initGame();
