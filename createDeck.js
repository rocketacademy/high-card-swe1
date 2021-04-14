// The deck
const deck = [
  {
    name: "ace",
    suit: "♥️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♥️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♥️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♥️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♥️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♥️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♥️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♥️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♥️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♥️",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♥️",
    rank: 11,
  },
  {
    name: "queen",
    suit: "♥️",
    rank: 12,
  },
  {
    name: "king",
    suit: "♥️",
    rank: 13,
  },
  {
    name: "ace",
    suit: "♦️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♦️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♦️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♦️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♦️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♦️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♦️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♦️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♦️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♦️",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♦️",
    rank: 11,
  },
  {
    name: "queen",
    suit: "♦️",
    rank: 12,
  },
  {
    name: "king",
    suit: "♦️",
    rank: 13,
  },
  {
    name: "ace",
    suit: "♣️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♣️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♣️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♣️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♣️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♣️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♣️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♣️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♣️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♣️",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♣️",
    rank: 11,
  },
  {
    name: "queen",
    suit: "♣️",
    rank: 12,
  },
  {
    name: "king",
    suit: "♣️",
    rank: 13,
  },
  {
    name: "ace",
    suit: "♠️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♠️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♠️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♠️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♠️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♠️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♠️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♠️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♠️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♠️",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♠️",
    rank: 11,
  },
  {
    name: "queen",
    suit: "♠️",
    rank: 12,
  },
  {
    name: "king",
    suit: "♠️",
    rank: 13,
  },
];

// Function to get random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function to shuffle cards
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

export const shuffledDeck = shuffleCards(deck);
