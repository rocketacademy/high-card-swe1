export const compareFinalScore = (playerOneScore, playerTwoScore, initGame) => {
  console.log("HELPER FINAL COMPARE ---> ", playerOneScore, playerTwoScore);
  if (playerOneScore > playerTwoScore) {
    alert("PlayerOne Wins HELPER");
    initGame();
  } else {
    alert("PlayerTwo Wins HELPER");
    initGame();
  }
};

export const compareCurrentScore = (playerOneScore, playerTwoScore) => {
  console.log(`COMPARE player1 ${playerOneScore}, player2 ${playerTwoScore}`);
  return playerOneScore > playerTwoScore;
};
