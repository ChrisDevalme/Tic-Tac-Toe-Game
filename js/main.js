/*----- constants -----*/

const playerPoints = {
  X: 0,
  O: 0
}
/*----- state variables -----*/

let gameActive = true
let currentPlayer = 'X'
let gameBoard = ['','','','','','','','','']


/*----- cached elements  -----*/
const scoreDisplay = document.querySelector(`.game-score`)
const messageDisplay = document.querySelector(`.game-message-display`)
const restartBtn = document.querySelector('restart-btn')

const winMessage = () => `${currentPlayer} WINS!`
const drawMessage = () => `TIE! No Winner, Want To Try Again?`
const currentPlayerTurn = () => `${currentPlayer} It's your Go`
const playerScores = () => `Player X Score - ${playerPoints.X} <br> Player O Score - ${playerPoints.O}`

messageDisplay.innerHTML = currentPlayerTurn()
scoreDisplay.innerHTML = playerScores()
playerScores()
/*----- event listeners -----*/

document.querySelectorAll('.box-space').forEach(box => box.addEventListener('click', boxClick))
document.querySelector('.restart-btn').addEventListener('click', restartGame)
  


/*----- functions -----*/

function boxClick(boxClickEvent){
  const boxclicked = boxClickEvent.target
  const clickedBoxIndex = parseInt(
    boxclicked.getAttribute('data-cell-index')
  )
  
  if(gameBoard[clickedBoxIndex] !== '' || !gameActive) {
    return;
  }

  checkIfBoxChecked(boxclicked, clickedBoxIndex)
  checkWinner()
  bestOf5()
}

function checkIfBoxChecked(boxClicked, clickedBoxIndex){
  gameBoard[clickedBoxIndex] = currentPlayer
  boxClicked.innerHTML = currentPlayer
}
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

  function checkWinner() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
      const winCombo = winCombos[i]
      let a = gameBoard[winCombo[0]]
      let b = gameBoard[winCombo[1]]
      let c = gameBoard[winCombo[2]]
      if(a === '' || b === '' || c === '') {
        continue
      }
      if(a === b && b === c) {
        roundWon = true;
        break
      }
    }
  if (roundWon) {
    messageDisplay.innerHTML = winMessage()
    if(currentPlayer === 'X') {
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

function bestOf5() {
  if (playerPoints.X === 3 || playerPoints.O === 3){
    if(playerPoints.X === 3){
      messageDisplay.innerHTML = `<span class='X'>X<span> won best 3 out 5<span> <br> run it back?`
      playerPoints.X *= 0
      playerPoints.O *= 0
      scoreDisplay.innerHTML = playerScores()
      
    } else {
      messageDisplay.innerHTML = `<span class='O'>0<span> won best 3 out 5 <br> run it back?`
      playerPoints.X *= 0
      playerPoints.O *= 0
      scoreDisplay.innerHTML = playerScores()
      
    }
  }
}

function PlayerTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  messageDisplay.innerHTML = currentPlayerTurn()
}

function restartGame() {
  gameActive = true;
  currentPlayer = 'X'
  gameBoard = ['','','','','','','','','']
  messageDisplay.innerHTML = currentPlayerTurn()
  document.querySelectorAll('.box-space').forEach(space => space.innerHTML = ``)
}