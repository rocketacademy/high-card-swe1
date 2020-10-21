/* eslint-disable no-unused-vars */
// Global Functions & Data

// Get a random number, given a maximum value
const getRandomNumber = (maxValue) => Math.floor(Math.random() * maxValue);

// Function to shuffle a set of cards
const shuffleCards = (cardArray) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cardArray.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomNumber(cardArray.length);

    // get the current card in the loop
    const currentItem = cardArray[currentIndex];

    // get the random card
    const randomItem = cardArray[randomIndex];

    // swap the current card and the random card
    cardArray[currentIndex] = randomItem;
    cardArray[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cardArray;
};

// Function to create a deck of cards
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  // Array to store the details of the card like Suit, Symbol and Color for respective suit
  const suits = [['hearts', '♥', 'red'], ['diamonds', '♦', 'red'],
    ['clubs', '♣', 'black'], ['spades', '♠', 'black']];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex][0];
    const currentSuitSymbol = suits[suitIndex][1];
    const currentCardColor = suits[suitIndex][2];
    // console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName = cardName;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        display: displayName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        color: currentCardColor,
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

const deck = shuffleCards(makeDeck()); // Deck of whole cards

let playersTurn = 1; // matches with starting instructions
const cardDeckOfPlayer1 = [];
const cardDeckOfPlayer2 = [];

/* DOM - Initial Steps
Creating buttons and other elements and adding it to the html in the required order */

// A div element for holding the input
const divInputContainer = document.createElement('div');
// An input element to get the count of the cards to be drawn
const inputCardCountElement = document.createElement('input');
// A div element for separating the buttons
const divButtonContainer = document.createElement('div');
// A button for Player1
const buttonPlayer1 = document.createElement('button');
// A button for Player2
const buttonPlayer2 = document.createElement('button');
// A div element to display information on Game status when necessary
const divGameStatusInfo = document.createElement('div');
// A div element to display the cards for each player
const divCardContainerPlayer1 = document.createElement('div');
const divCardContainerPlayer2 = document.createElement('div');
// An element for break
const breakElement = document.createElement('br');

// Utility function for debugging purpose.
// To print all the cards into the console
const printToConsole = (cardDeck) => {
  for (let i = 0; i < cardDeck.length; i += 1)
  {
    console.log(`name: ${cardDeck[i].name},
        display: ${cardDeck[i].display},
        suit: ${cardDeck[i].suit},
        suitSymbol: ${cardDeck[i].suitSymbol},
        rank: ${cardDeck[i].rank},
        color: ${cardDeck[i].color}`);
  }
};

// don't write the dom manipulation
// code inline in the conditional
// create a helper function for setting the information on game
const setGameStatusInfo = (message) => {
  divGameStatusInfo.innerText = message;
};

// Function Reset the elements
const resetElements = () => {
  divCardContainerPlayer1.innerHTML = '';
  divCardContainerPlayer2.innerHTML = '';
};

/*
 Function to build the necessary DOM elements for displaying a SINGLE card
 This function accepts a single card object as input
 Expected HTML format:
    <div class="card">
        <div class="name color">3</div>
        <div class="suit color">♥️</div>
    </div>
 */
const buildSingleCardElement = (infoSingleCard) => {
  // Creating the element for storing the card display name
  // 2 Class names are applicable "name, <color>"
  const divNameElement = document.createElement('div');
  divNameElement.classList.add('name', infoSingleCard.color);
  divNameElement.innerText = infoSingleCard.display;

  // Creating the element for storing the suit symbol of the card
  // Class = "suit"
  const divSuitElement = document.createElement('div');
  divSuitElement.classList.add('suit', infoSingleCard.color);
  divSuitElement.innerText = infoSingleCard.suitSymbol;

  // The parent element that holds both the display name and suit symbol
  // This element represents a whole single card
  // Class name = "card"
  const divSingleCardElement = document.createElement('div');
  divSingleCardElement.classList.add('card');
  divSingleCardElement.appendChild(divNameElement);
  divSingleCardElement.appendChild(divSuitElement);
  // Card element is returned from this function
  return divSingleCardElement;
};

/**
 * Function to build a container element to hold and display all the cards drawn by the players
 * Expected HTML Format:
 * <div class="card-container-1">
 *      <div class="card"></div>
 *      ....
 * </div>
 * <div class="card-container-2">
 *      <div class="card"></div>
 *      ....
 * </div>
 */
const buildCardContainerPlayer1 = () => {
  divCardContainerPlayer1.classList.add('card-container-1');
  divCardContainerPlayer1.innerHTML = 'Cards with Player-1: </br>';
  for (let i = 0; i < cardDeckOfPlayer1.length; i += 1)
  {
    const elemCardPlayer1 = buildSingleCardElement(cardDeckOfPlayer1[i]);
    divCardContainerPlayer1.appendChild(elemCardPlayer1);
  }
  document.body.appendChild(divCardContainerPlayer1);
};

const buildCardContainerPlayer2 = () => {
  divCardContainerPlayer2.classList.add('card-container-2');
  divCardContainerPlayer2.innerHTML = 'Cards with Player-2: </br>';
  for (let i = 0; i < cardDeckOfPlayer2.length; i += 1)
  {
    const elemCardPlayer2 = buildSingleCardElement(cardDeckOfPlayer2[i]);
    divCardContainerPlayer2.appendChild(elemCardPlayer2);
  }
  document.body.appendChild(divCardContainerPlayer2);
  cardDeckOfPlayer2.length = 0;
};

// Adding event listener handling functions for the buttons

// Handler function for Buttons
// Here, it simply takes a card from the deck and tells next turn is of Player2
const onClickPlayer1DrawSingleCard = () => {
  if (playersTurn === 1) {
    resetElements();
    if (deck.length === 0) // if the deck of card is empty, no need to proceed further
    {
      setGameStatusInfo('Deck of cards is empty. Please refresh to start a new game.');
    }
    cardDeckOfPlayer1.push(deck.pop());
    setGameStatusInfo(`Player1 card: ${cardDeckOfPlayer1.name} of ${cardDeckOfPlayer1.suit}. Next Turn is of Player 2.`);
    playersTurn = 2;
    buildCardContainerPlayer1();
  }
  else {
    setGameStatusInfo('Turn of Player 2');
  }
};

// Here, it simply takes a card from the deck and compares with card of Player1.
// This function decides the winner too
const onClickPalyer2DrawSingleCard = () => {
  if (playersTurn === 2)
  {
    if (deck.length === 0) // if the deck of card is empty, no need to proceed further
    {
      setGameStatusInfo('Deck of cards is empty. Please refresh to start a new game.');
    }
    cardDeckOfPlayer2.push(deck.pop());
    playersTurn = 1;
    // Compare the ranks of the cards with the 2 players.
    // Player with a high card ranks wins
    if (cardDeckOfPlayer1.rank > cardDeckOfPlayer2.rank)
    {
      setGameStatusInfo(`Player1 card: ${cardDeckOfPlayer1.name} of ${cardDeckOfPlayer1.suit}.
        Player2 card: ${cardDeckOfPlayer2.name} of ${cardDeckOfPlayer2.suit}.
        Player-1 wins.`);
    }
    else if (cardDeckOfPlayer1.rank < cardDeckOfPlayer2.rank)
    {
      setGameStatusInfo(`Player1 card: ${cardDeckOfPlayer1.name} of ${cardDeckOfPlayer1.suit}.
      Player2 card: ${cardDeckOfPlayer2.name} of ${cardDeckOfPlayer2.suit}.
      Player-2 wins.`);
    }
    // If both the players are having the same rank, it's a tie.
    else {
      setGameStatusInfo(`Player1 card: ${cardDeckOfPlayer1.name} of ${cardDeckOfPlayer1.suit}.
        Player2 card: ${cardDeckOfPlayer2.name} of ${cardDeckOfPlayer2.suit}.
        It's a tie`);
    }
    buildCardContainerPlayer2();
  }
  else {
    setGameStatusInfo('Turn of Player 1');
  }
};

// Function to get the required number of cards from the deck to fill the specified player deck
const getCardsFromDeck = (cardDeckOfPlayer) => {
// if the deck of card is less than the count of cards needed, no need to proceed further
  if (deck.length <= inputCardCountElement.valueAsNumber)
  {
    setGameStatusInfo('Not enough cards in the Deck. Please refresh to start a new game.');
    return;
  }
  for (let i = 0; i < inputCardCountElement.valueAsNumber; i += 1)
  {
    cardDeckOfPlayer.push(deck.pop());
  }
};

const comparePlayerDecks = () => {
  // Sort the cards with the players
  // To compare numbers, the compare function can simply subtract b from a.
  cardDeckOfPlayer1.sort((card1, card2) => (card1.rank - card2.rank));
  cardDeckOfPlayer2.sort((card1, card2) => (card1.rank - card2.rank));

  //   console.log('Player1 Cards: ');
  //   printToConsole(cardDeckOfPlayer1);
  //   console.log('Player2 Cards: ');
  //   printToConsole(cardDeckOfPlayer2);

  // Find the difference between the highest and lowest cards of each player.
  const rankDiffOfPlayer1 = (cardDeckOfPlayer1.length === 0) ? 0
    : Math.abs(cardDeckOfPlayer1[0].rank - cardDeckOfPlayer1[cardDeckOfPlayer1.length - 1].rank);
  const rankDiffOfPlayer2 = (cardDeckOfPlayer2.length === 0) ? 0
    : Math.abs(cardDeckOfPlayer2[0].rank - cardDeckOfPlayer2[cardDeckOfPlayer2.length - 1].rank);

  console.log(`rankDiffOfPlayer1: ${rankDiffOfPlayer1}; rankDiffOfPlayer2: ${rankDiffOfPlayer2}`);

  // Set the game status
  if (rankDiffOfPlayer1 > rankDiffOfPlayer2)
  {
    setGameStatusInfo('Player-1 wins.');
  }
  else if (rankDiffOfPlayer1 < rankDiffOfPlayer2)
  {
    setGameStatusInfo('Player-2 wins.');
  }
  else {
    setGameStatusInfo('It\'s a tie');
  }
};

// Button handler function to draw multiple cards
const onClickPlayer1DrawMultipleCards = () => {
  if (playersTurn === 1) {
    cardDeckOfPlayer1.length = 0;
    resetElements();
    getCardsFromDeck(cardDeckOfPlayer1);
    setGameStatusInfo('Next Turn is of Player 2.');
    playersTurn = 2;
    buildCardContainerPlayer1();
  }
  else {
    setGameStatusInfo('Turn of Player 2');
  }
};

const onClickPalyer2DrawMultipleCards = () => {
  if (playersTurn === 2)
  {
    cardDeckOfPlayer2.length = 0;
    getCardsFromDeck(cardDeckOfPlayer2);
    playersTurn = 1;
    // Compare the ranks of the cards with the 2 players.
    // Player with a high card rank difference wins
    comparePlayerDecks();
    buildCardContainerPlayer2();
  }
  else {
    setGameStatusInfo('Turn of Player 1');
  }
};

// Function that initializes the Game. Should be invoked in the beginning
const gameInit = () => {
  // Set the attribute for the input element
  inputCardCountElement.setAttribute('type', 'number');
  inputCardCountElement.placeholder = 'Enter no: of cards';
  divInputContainer.appendChild(inputCardCountElement);

  // Append both the buttons to the div element and add to the html
  // button1
  buttonPlayer1.innerText = 'Player-1 Draw';
  divButtonContainer.appendChild(buttonPlayer1);
  // button2
  buttonPlayer2.innerText = 'Player-2 Draw';
  divButtonContainer.appendChild(buttonPlayer2);

  // Event listeners for both the buttons
  //   buttonPlayer1.addEventListener('click', onClickPlayer1DrawSingleCard);
  //   buttonPlayer2.addEventListener('click', onClickPalyer2DrawSingleCard);

  // To handle the case for drawing multiple cards by each user.
  // Count is decided by the input specified
  buttonPlayer1.addEventListener('click', onClickPlayer1DrawMultipleCards);
  buttonPlayer2.addEventListener('click', onClickPalyer2DrawMultipleCards);

  divGameStatusInfo.innerText = 'It\'s the turn of Player1. Click to draw a card!';

  // Adding components to the documnent in order
  // Adding input container to document
  document.body.appendChild(divInputContainer);
  document.body.appendChild(breakElement);
  document.body.appendChild(breakElement);

  // Adding buttons div to document
  document.body.appendChild(divButtonContainer);
  // Adding game info container to document.
  document.body.appendChild(divGameStatusInfo);
};

gameInit();
