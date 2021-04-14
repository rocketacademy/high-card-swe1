export const h = () => {
  alert("Hello");
};

export const buildDOM = (playerOneName, playerTwoName) => {
  // Creating the view we see once document load

  // Main Container
  const mainSection = document.createElement("main");

  // Start Game Button
  const startButtonContainer = document.createElement("div");
  const startButton = document.createElement("button");
  startButtonContainer.classList.add("start-btn-container");
  startButton.classList.add("start-button");
  startButton.innerText = "Start game";

  // Game info section
  const gameInfoSection = document.createElement("section");
  const gameInfoContainer = document.createElement("div");

  // Add class names
  gameInfoSection.classList.add("section-gameInfoSection");
  gameInfoContainer.classList.add("gameInfoContainer");

  // Card draw secton
  const cardDrawSection = document.createElement("section");
  const cardDrawContainer = document.createElement("div");
  const cardDrawDiv1 = document.createElement("div");
  const cardDrawDiv2 = document.createElement("div");

  // Add class names
  cardDrawSection.classList.add("section-cardDrawSection");
  cardDrawContainer.classList.add("cardDrawContainer");

  // ADD CHILD ELEMENTS TO EACH SECTIONS

  // Add Elements -> Game info section
  const gameInfoSectionHeader = document.createElement("h1");
  gameInfoSectionHeader.innerText = "Let's Play Cards!";
  gameInfoSectionHeader.classList.add("gameinfoSectionHeader");

  // Add Elements -> Card draw section
  const cardDrawRank1 = document.createElement("p");
  const cardDrawRank2 = document.createElement("p");
  const cardDrawSuit1 = document.createElement("p");
  const cardDrawSuit2 = document.createElement("p");
  cardDrawRank1.innerText = "";
  cardDrawRank2.innerText = "";
  cardDrawSuit1.innerText = "";
  cardDrawSuit2.innerText = "";

  // ADD CLASS NAMES
  cardDrawDiv1.classList.add("cardDrawDiv1");
  cardDrawDiv2.classList.add("cardDrawDiv2");
  cardDrawRank1.classList.add("cardDrawRank1");
  cardDrawRank2.classList.add("cardDrawRank2");
  cardDrawSuit1.classList.add("cardDrawSuit1");
  cardDrawSuit2.classList.add("cardDrawSuit2");

  // PLAYER BUTTON
  const playerButtonSection = document.createElement("section");
  const playerButtonContainer = document.createElement("div");
  const playerButtonDiv1 = document.createElement("div");
  const playerButtonDiv2 = document.createElement("div");

  const player1Button = document.createElement("button");
  const player2Button = document.createElement("button");

  // ADD CLASS NAMES
  playerButtonSection.classList.add("playerButtonSection");
  playerButtonContainer.classList.add("playerButtonContainer");
  playerButtonDiv1.classList.add("playerButtonDiv1");
  playerButtonDiv2.classList.add("playerButtonDiv2");
  player1Button.classList.add("player1Button");
  player2Button.classList.add("player2Button");

  // Add Elements -> Player Button section

  player1Button.innerText = "Player One Draw Card";
  player2Button.innerText = "Player Two Draw Card";

  // SCORE Container
  const scoreSection = document.createElement("section");
  const scoreContainer = document.createElement("div");
  const playerOneScoreDiv = document.createElement("div");
  const playerOneScoreHeader = document.createElement("h4");
  const playerTwoScoreDiv = document.createElement("div");
  const playerTwoScoreHeader = document.createElement("h4");

  // ADD CLASS NAMES
  scoreSection.classList.add("score-section");
  scoreContainer.classList.add("score-container");
  playerOneScoreDiv.classList.add("playerOneScoreDiv");
  playerTwoScoreDiv.classList.add("playerTwoScoreDiv");
  playerOneScoreHeader.classList.add("playerOneScoreHeader");
  playerTwoScoreHeader.classList.add("playerTwoScoreHeader");

  // Add Elements -> SCORE Container
  playerOneScoreHeader.innerText = "0";
  playerTwoScoreHeader.innerText = "0";

  // APPEND ALL ELEMENTS TO DOM

  // Game info section
  gameInfoContainer.appendChild(gameInfoSectionHeader);
  gameInfoSection.appendChild(gameInfoContainer);
  // mainSection.appendChild(gameInfoSection);
  // document.body.appendChild(mainSection);

  // Card draw section
  cardDrawDiv1.appendChild(cardDrawRank1);
  cardDrawDiv1.appendChild(cardDrawSuit1);
  cardDrawDiv2.appendChild(cardDrawRank2);
  cardDrawDiv2.appendChild(cardDrawSuit2);

  cardDrawContainer.appendChild(cardDrawDiv1);
  cardDrawContainer.appendChild(cardDrawDiv2);

  cardDrawSection.appendChild(cardDrawContainer);
  // mainSection.appendChild(cardDrawSection);

  // Score Section
  playerOneScoreDiv.appendChild(playerOneScoreHeader);
  playerTwoScoreDiv.appendChild(playerTwoScoreHeader);
  scoreContainer.appendChild(playerOneScoreDiv);
  scoreContainer.appendChild(playerTwoScoreDiv);
  scoreSection.appendChild(scoreContainer);

  // Player Button section
  playerButtonDiv1.appendChild(player1Button);
  playerButtonDiv2.appendChild(player2Button);
  playerButtonContainer.appendChild(playerButtonDiv1);
  playerButtonContainer.appendChild(playerButtonDiv2);
  playerButtonSection.appendChild(playerButtonContainer);

  // Start Button
  startButtonContainer.appendChild(startButton);

  // Build the DOM here
  document.body.appendChild(mainSection);
  mainSection.appendChild(gameInfoSection);
  mainSection.appendChild(scoreSection);
  mainSection.appendChild(cardDrawSection);
  mainSection.appendChild(playerButtonSection);
  mainSection.appendChild(startButtonContainer);
};
