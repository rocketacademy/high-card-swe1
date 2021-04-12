const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let player1Card;

const player1Button = document.createElement('button');

const player2Button = document.createElement('button');

const gameInfo = document.createElement('div');

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
let cardContainer;
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
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
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
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.display, cardInfo.color);
  name.innerText = '3';

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const player1Click = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();

    const cardElement = createCard(player1Card);

    // in case this is not the 1st time
    // in the entire app,
    // empty the card container
    cardContainer.innerHTML = '';

    cardContainer.appendChild(cardElement);

    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    const player2Card = deck.pop();
    cardContainer.appendChild(cardElement);

    playersTurn = 1;

    if (player1Card.rank > player2Card.rank) {
      output('player 1 wins');
    } else if (player1Card.rank < player2Card.rank) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
};

const cardOutput = (message) => {
  gameInfo.innerText = message;
};
const initGame = () => {
  // initialize button functionality
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
  player1Button.innerText = 'Player 1 Draw';
  cardContainer.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  cardContainer.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  cardContainer.appendChild(gameInfo);

};