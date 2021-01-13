// High Card V2
 
const getRandomIndex = arraySize => Math.floor(Math.random() * arraySize);

const shuffleCards = cards => {
  // Loop over all the cards
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random position in the deck
    const randomIndex = getRandomIndex(cards.length);

    // Create variable for random & current card
    const currentItem = cards[currentIndex];
    const randomItem = cards[randomIndex];

    // Swap current card with random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;
  }
  // Return the shuffled deck of cards
  return cards;
}

const makeDeck = () => {
  // Create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbol = ['❤️', '♦️', '♣️', '♠️']
  const defaultColor = 'black'

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbol[suitIndex];

    // loop to create all cards in this suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;       // Convert rankCounter to string
      let displayLetter = `${rankCounter}`;  // Convert rankCounter to string

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayLetter = 'A'
      } else if (cardName === '11') {
        cardName = 'jack';
        displayLetter = 'J'
      } else if (cardName === '12') {
        cardName = 'queen';
        displayLetter = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        displayLetter = 'K'
      }

      // red or black
      if (defaultColor === 'hearts' || defaultColor === 'diamonds') {
        defaultColor = 'red';
      } else {
        defaultColor; 
      }

      // make a single card object variable
      const card = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        display: displayLetter,
        color: defaultColor,
        rank: rankCounter,
      };

      // Add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

// Create card by adding relevant CSS classes & fonts
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.display;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create element function
const customCreate = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);

  return element;
}

// Global variables
const deck = shuffleCards(makeDeck());

// Create card variables outside function scope to compare them in player1Click() & player2Click()
let playersTurn = 1;
let player1Card;
let player2Card;

// Create arrays to track player1 & player2 scores
let player1CardArr = [];
let player2CardArr = [];

// Create buttons for player 1 & 2 with customCreate() function
const player1Button = customCreate('button', 'player1-button');
const player2Button = customCreate('button', 'player2-button');

// Create game info on whose turn, render it to the Table
const gameInfo = customCreate('div', 'game-info');
const table = customCreate('div', 'table');

// Create a red mat for cards to be displayed
const cards1Div = customCreate('div', 'card1-div');
table.appendChild(cards1Div);
const cards2Div = customCreate('div', 'card2-div');
table.appendChild(cards2Div);

// Create a score board below the table 
const scoreDiv = customCreate('div', 'score-div');
const scoreBoard1 = customCreate('span', 'score1-span');
scoreBoard1.innerHTML = "<br>" + "Player 1 Score :"    + "<br>"
const scoreBoard2 = customCreate('span', 'score2-span');
scoreBoard2.innerHTML = "<br>" +  "Player 2 Score :"    + "<br>"


// Append player1 & player2 buttons into the buttonsDiv which will be appended to the table
const buttonsDiv = customCreate('div', 'buttons-div');

// Render game information to the DOM
const output = (message) => {
  gameInfo.innerText = message;
};

const sumCardsArr = (playerArr) => {
  let sum = 0;
  for (let i = 0; i < playerArr.length ; i++) {
      sum += Number(playerArr[i].rank);
  }
  return sum;
}

// Create the scores that reflect the cards
const player1CurrScore = customCreate('span', 'player-scores');
const player2CurrScore = customCreate('span', 'player-scores');

// Player Action Callbacks
const player1Click = () => {
  gameInfo.innerText = "It's Player 2's turn. Click to draw a card!";

  if (playersTurn === 1) {
    // Retrieve card from the shuffled deck
    let randomCard = deck.pop();
    player1Card = randomCard
    player1CardArr.push(randomCard);

    // Use createCard() function to create a <div> element containing more <div> for the card
    let domCard = createCard(player1Card);
    cards1Div.appendChild(domCard);
    table.appendChild(cards1Div);

    // Update the scoreboards below the table that reflect the cards
    player1CurrScore.innerHTML = ''
    player1CurrScore.innerHTML = sumCardsArr(player1CardArr);
    scoreBoard1.appendChild(player1CurrScore)

    playersTurn = 2;
  }
};

const player2Click = () => {
  if (playersTurn === 2) {
    gameInfo.innerText = "It's Player 1 turn. Click to draw a card!";

    let randomCard = deck.pop();
    player2Card = randomCard;
    player2CardArr.push(randomCard);

    // Use createCard() function to create a <div> element containing more <div> for the card
    let domCard = createCard(player2Card);
    cards2Div.appendChild(domCard);
    table.appendChild(cards2Div);

    let sumPlayer2Score =  sumCardsArr(player2CardArr)

    // Update the scoreboards below the table that reflect the cards
    player2CurrScore.innerHTML = '';
    player2CurrScore.innerHTML = sumPlayer2Score;
    scoreBoard2.appendChild(player2CurrScore)

    playersTurn = 1;
    
    // Since Player 2 comes after Player 1, compare scores after Player 2 turn
    if (sumCardsArr(player1CardArr) > sumPlayer2Score ) {
      output('Player 1 Wins!');
    } else if (sumCardsArr(player1CardArr) < sumPlayer2Score) {
      output('Player 2 Wins!');
    } else {
      output('Tie!');
    }
  }
}

const initGame = () => {
  // Fill game info div with starting instructions
  gameInfo.innerText = "It's Player 1's turn. Click to draw a card!";
  table.appendChild(gameInfo);

  // Initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  buttonsDiv.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  buttonsDiv.appendChild(player2Button);

  table.appendChild(buttonsDiv);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);
};

// Append relevant elements to the DOM
document.body.appendChild(table);
scoreDiv.appendChild(scoreBoard1);
scoreDiv.appendChild(scoreBoard2);
document.body.appendChild(scoreDiv);

initGame();