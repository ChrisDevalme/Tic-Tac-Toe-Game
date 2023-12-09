/*----- constants -----*/
// This object keeps track of the rounds won by both players
const playerPoints = {
  X: 0,
  O: 0
}
// This is the different variations of win combonations
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
/*----- state variables -----*/

let gameActive = true
let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']


/*----- cached elements  -----*/
const scoreDisplay = document.querySelector(`.game-score`) // DOM element for game score
const messageDisplay = document.querySelector(`.game-message-display`) // Dom elemnent recordig player turns
const restartBtn = document.querySelector('.restart-btn') // DOM element for restart buttom

const winMessage = () => `${currentPlayer} WINS!` // Message displayed when a win occurs
const drawMessage = () => `TIE! No Winner, Want To Try Again?` // Message displayed when there is a tie game
const currentPlayerTurn = () => `${currentPlayer} It's your Go` // Message to display whho's turn it is 
const playerScores = () => `Player X Score - ${playerPoints.X} <br> Player O Score - ${playerPoints.O}` // Player score tally display

messageDisplay.innerHTML = currentPlayerTurn()
scoreDisplay.innerHTML = playerScores()

/*----- event listeners -----*/

document.querySelectorAll('.box-space').forEach(box => box.addEventListener('click', boxClick)) // event listener for when a box on the board is checked by the player 

document.querySelector('.restart-btn').addEventListener('click', restartGame) // event listener for when the game is restarted 

/*----- functions -----*/

function boxClick(boxClickEvent) {// function getting the 
  const boxclicked = boxClickEvent.target
  const clickedBoxIndex = parseInt(boxclicked.getAttribute('data-cell-index'))

  if (gameBoard[clickedBoxIndex] !== '' || !gameActive) {
    return;
  }

  makeMove(boxclicked, clickedBoxIndex)
  checkWinner()
  bestOf5()
  showRestartBtn()
}

function makeMove(boxClicked, clickedBoxIndex) {
  gameBoard[clickedBoxIndex] = currentPlayer
  boxClicked.innerHTML = currentPlayer
}

function checkWinner() { // function to check whether any player has won the round
  let roundWon = false;
  for (let x = 0; x <= 7; x++) {

    const winCombo = winCombos[x]
    let w = gameBoard[winCombo[0]]
    let i = gameBoard[winCombo[1]]
    let n = gameBoard[winCombo[2]]

    if (w === '' || i === '' || n === '') {
      continue
    }

    if (w === i && i === n) {
      roundWon = true;
      
      break
    }
  }

  if (roundWon) {
    messageDisplay.innerHTML = winMessage()

    if (currentPlayer === 'X') {
      playerPoints.X += 1
      scoreDisplay.innerHTML = playerScores()
    } else {
      playerPoints.O += 1
      scoreDisplay.innerHTML = playerScores()
    }

    gameActive = false;
    return
  }

  let roundDraw = !gameBoard.includes('')

  if (roundDraw) {
    messageDisplay.innerHTML = drawMessage()
    gameActive = false
    return
  }
  PlayerTurn()
}

function PlayerTurn() { // function to determine which player turn it is
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  messageDisplay.innerHTML = currentPlayerTurn()
}

function bestOf5() { // function checking whether or not wither player has won 3 rounds
  if (playerPoints.X === 3) {
    messageDisplay.innerHTML = `<span class='X'>X<span> won best 3 out 5<span> <br> run it back?`
    playerPoints.X *= 0
    playerPoints.O *= 0
    scoreDisplay.innerHTML = playerScores()

  } else if (playerPoints.O === 3) {
    messageDisplay.innerHTML = `<span class='O'>0<span> won best 3 out 5 <br> run it back?`
    playerPoints.X *= 0
    playerPoints.O *= 0
    scoreDisplay.innerHTML = playerScores()
  }
}

function showRestartBtn() { // if game is active restart button will remain hidden
  restartBtn.style.visibility = gameActive ? 'hidden' : 'visible'
}

function restartGame() { // function for when the restart button has been pressed
  gameActive = true;
  currentPlayer = 'X'
  gameBoard = ['', '', '', '', '', '', '', '', '']
  messageDisplay.innerHTML = currentPlayerTurn()
  document.querySelectorAll('.box-space').forEach(space => space.innerHTML = ``)
  restartBtn.style.visibility = 'hidden'
}