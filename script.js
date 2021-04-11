// ===== Helper functions ========
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
  const suits = ['❤︎', '◆', '♣', '♠'];

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
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
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

const output = (message) => {
  resultsText.innerText = message;
};



// ===== Global Setup =======
const deck = shuffleCards(makeDeck());

let playersTurn = 1; // matches with starting instructions
let playerOneCard; 
let playerOneScore = 0;
let playerTwoScore = 0;

// buttons for drawing cards
const playerOneDraw = document.querySelector('.player-one-draw');
const playerTwoDraw = document.querySelector('.player-two-draw');

const gameInstructions = document.querySelector('.instructions-text');
const resultsContainer = document.querySelector('.results-container');
const resultsText = document.querySelector('.results-text');
const playerActionsContainer = document.querySelector('.player-actions-container');

// Player One's Card Results
const playerOneCardReveal = document.querySelector('.player-one-card');
const playerOneCardName = document.querySelector('.player-one-card .card-name');
const playerOneCardSuit = document.querySelector('.player-one-card .card-suit');
const playerOneScoreTag = document.querySelector('.player-one-score')

// Player Two's Card Results
const playerTwoCardReveal = document.querySelector('.player-two-card');
const playerTwoCardName = document.querySelector('.player-two-card .card-name');
const playerTwoCardSuit = document.querySelector('.player-two-card .card-suit');
const playerTwoScoreTag = document.querySelector('.player-two-score')

// Replay or End Game
const replayTag = document.querySelector('.replay-btn');
const endGameTag = document.querySelector('.end-game-btn');


// ======== Start of game ===========
const initGame = () => {
  playerOneCardReveal.style.display = 'none';
  playerTwoCardReveal.style.display = 'none';
  resultsContainer.style.display = 'none';
  
  playerOneDraw.disabled = false;
  playerTwoDraw.disabled = true; 

  gameInstructions.innerHTML = 'Player 1 goes first';

  playerOneDraw.addEventListener('click', playerOneClicks); 
  playerTwoDraw.addEventListener('click', playerTwoClicks);

}

// player 1 clicks on the Draw button
const playerOneClicks = () => {
  playerOneCard = deck.pop();

  // print card
  playerOneCardReveal.style.display = 'block';
  playerOneCardName.innerHTML = `${playerOneCard.name}`;
  playerOneCardSuit.innerHTML = `${playerOneCard.suit}`;
  
  // switch the disabled draw buttons
  playerOneDraw.disabled = true;
  playerTwoDraw.disabled = false;
  gameInstructions.innerHTML = 'Player 2 goes next';
}

// player 2 clicks on the Draw button
// if playersTurn == 1 : 
const playerTwoClicks = () => {
  playerTwoCard = deck.pop();
  
  // print card
  playerTwoCardReveal.style.display = 'block';
  playerTwoCardName.innerHTML = `${playerTwoCard.name}`;
  playerTwoCardSuit.innerHTML = `${playerOneCard.suit}`;
  
  // remove the draw actions and replace with the results
  playerTwoDraw.disabled = true;
  resultsContainer.style.display = 'block';
  gameInstructions.innerHTML = `What's next?`;

  // reveal results 
  if (playerOneCard.rank > playerTwoCard.rank) {
    output('Player 1 wins');
    playerOneScore += 1; 

  } else if (playerOneCard.rank < playerTwoCard.rank) {
    output('Player 2 wins');
    playerTwoScore += 1;

  } else {
    output(`It's a tie`);
  }

  playerOneScoreTag.innerHTML = `${playerOneScore}`;
  playerTwoScoreTag.innerHTML = `${playerTwoScore}`;
}

// Actual game 
initGame();

// Replay Game
replayTag.addEventListener('click',() => {
  initGame();
})

// End Game
endGameTag.addEventListener('click', () => {
  // remove game
  playerActionsContainer.style.display = 'none'; 

  // winning logic 
  if (playerOneScore > playerTwoScore) {
    output('Player 1 beats Player 2');
  }

  else if (playerOneScore < playerTwoScore) {
    output('Player 2 beats Player 1');
  }

  else {
    output('Player 1 and Player 2 draw');
  }
})


// Game Initialization
// const initGame = () => {
//   // initialize button functionality
//   playerOneDraw.innerText = 'Player 1 Draw';
//   document.body.appendChild(playerOneDraw);

//   playerTwoDraw.innerText = 'Player 2 Draw';
//   document.body.appendChild(playerTwoDraw);

//   playerOneDraw.addEventListener('click', player1Click);
//   playerTwoDraw.addEventListener('click', player2Click);

//   // fill game info div with starting instructions
//   gameInstructions.innerText = 'Its player 1 turn. Click to draw a card!';
//   document.body.appendChild(gameInstructions);
// };

