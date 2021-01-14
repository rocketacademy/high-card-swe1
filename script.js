// Please implement exercise logic here
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

//makes a deck of cards
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
      let cardVal = `${rankCounter}`

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        cardVal = 'A'
      } else if (cardName === '11') {
        cardName = 'jack';
        cardVal = 'J'
      } else if (cardName === '12') {
        cardName = 'queen';
        cardVal = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        cardVal = 'K'
      }
      
      //suit symbol
      let color;
      let suitSymbol;
      if (suits[suitIndex] == 'hearts') {
        color = 'red'
        suitSymbol = '♥'
      } else if (suits[suitIndex] == 'diamonds') {
        suitSymbol = '♦'
        color = 'red'
      } else if (suits[suitIndex] == 'clubs') {
        suitSymbol = '♣'
        color = 'black'
      } else if (suits[suitIndex] == 'spades') {
        suitSymbol = '♠'
        color = 'black'
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: color,
        suitSymbol: suitSymbol,
        cardVal: cardVal
      };

      console.log(`rank: ${rankCounter} ${suitSymbol} ${color} ${cardName}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

const output = (message) => {
  gameInfo.innerText = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);    
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.cardVal;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
  };

const deck = shuffleCards(makeDeck());

const player1Click = (num) => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;
    cardContainer1.innerHTML = ''
    cardContainer2.innerHTML = ''
    for (let i = 0; i < num; i += 1){
      player1Card = deck.pop();
      player1CardElement = createCard(player1Card)
      player1CardElement.classList.add('player1')
      cardContainer1.appendChild(player1CardElement);
      if (player1Card.rank > maxRank1) {
        maxRank1 = player1Card.rank
      } 
      if (player1Card.rank < minRank1) {
        minRank1 = player1Card.rank
    }
    playersTurn = 2;
    canClick = true
  }
    console.log(`minimum rank is ${minRank1}`)
    console.log(`max rank is ${maxRank1}`)
  setTimeout(() => {
    output("It's player 2's turn. Click to draw a card")
  }, 1000);
};
}
const player2Click = (num) => {
  if (playersTurn === 2) {
    let player2Card = null;
    cardContainer2.innerHTML = ''
    let maxRank2 = 0
    let minRank2 = 15
    for (let i = 0; i < num; i += 1){
      player2Card = deck.pop();
      cardContainer2.appendChild(createCard(player2Card));
      if (player2Card.rank > maxRank2) {
        maxRank2 = player2Card.rank
      }
      if (player2Card.rank < minRank2) {
        minRank2 = player2Card.rank
      }
    }  
    playersTurn = 1;
    console.log(`minimum rank2 is ${minRank2}`)
    console.log(`max rank2 is ${maxRank2}`)

    if ((maxRank1 - minRank1) > (maxRank2 - minRank2) ) {
      output('player 1 wins');
    } else if ((maxRank1 - minRank1) < (maxRank2 - minRank2) ) {
      output('player 2 wins');
    } else {
      output('tie');
    }
  }
  setTimeout(() => {
    output("It's player 1's turn. Click to draw a card!")
  }, 1500)
  // reset max and min values
  maxRank1 = 0;
  minRank1 = 13;
};


let player1Card
let playersTurn = 1; // matches with starting instructions
let cardContainer1;
let cardContainer2;
let canClick = true
let numCards = 3
let maxRank1 = 0;
let minRank1 = 13;

//creating permanent elements
const mainDiv = document.createElement('div')
mainDiv.classList.add('mainDiv')
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');


const initGame = () => {
  document.body.appendChild(mainDiv)
  // card container for first player
  cardContainer1 = document.createElement('div');
  mainDiv.appendChild(cardContainer1)
  cardContainer1.classList.add('card-container1');

  //card container for second player
  cardContainer2 = document.createElement('div');
  mainDiv.appendChild(cardContainer2)
  cardContainer2.classList.add('card-container2');

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', () => {player1Click(numCards)});
  player2Button.addEventListener('click', () => {player2Click(numCards)});

  // fill game info div with starting instructions
  gameInfo.innerText = "It's player 1's turn. Click to draw a card!";
  document.body.appendChild(gameInfo);
}

initGame()