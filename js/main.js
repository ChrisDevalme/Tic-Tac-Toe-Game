console.log('connected')
/*----- constants -----*/
const ICONS = {
  '1': 'X', // represents Player 1 on space
  '0': 'blank', // represents no player on space
  '-1': 'O' // represents Player 2 on space
}

/*----- state variables -----*/

let turn // Which playyer is going
let board  // the game board
let winner // Winner of game

/*----- cached elements  -----*/

const messageEl = document.getElementById('game-message')
const restartbtn = document.getElementById('reset-btn')
const boardSpaces = [...document.querySelectorAll('#board > div')] // ... turns node list into array

/*----- event listeners -----*/

document.querySelector('#board').addEventListener('click', playerMove)


/*----- functions -----*/

freshBoard()

function freshBoard() { //funtion to start game
  turn = 1;
  board = [
    [0, 0, 0], //c1
    [0, 0, 0],
    [0, 0, 0]  //c2
    //r0 r1 r2
  ]
  winner = null
  render()
}

function playerMove(event) {
  if (event.target.classList.contains('blank')){
    event.target.classList.remove(`blank`)
    event.target.classList.add(`${ICONS[turn]}`)
    event.target.innerText = `${ICONS[turn]}`

    board.forEach(function(columnArray, columnIndex) { // looping over each item of array and each array its self
      columnArray.forEach(function(rowValue, rowIndex){
        const boardSpace = `c${columnIndex}r${rowIndex}`
        const boardEl = document.getElementById(boardSpace)
      })
    })
    
    turn *= -1
    console.log(event.target)
    console.log(turn)
  }
}

function render() { // function to tranfer state of app to the DOM
  renderFreshBoard()
  renderMessage()
  renderControls()
}

function renderFreshBoard() {
  board.forEach(function(columnArray, columnIndex) { // looping over each item of array and each array its self
    columnArray.forEach(function(rowValue, rowIndex){
      const boardSpace = `c${columnIndex}r${rowIndex}`
      const boardEl = document.getElementById(boardSpace)
      boardEl.classList.add(`${ICONS[rowValue]}`)
      boardEl.innerText = ICONS[rowValue]
    })
  })
}

function renderMessage() {
  if (winner === 'Tie') {
    messageEl.innerHTML = `TIE GAME! <br> Click The Restart Button To Play Again`
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: red; font-size: 5vmin; margin-right: 3vmin;">${ICONS[turn]}</span> <span style="font-size: 5vmin;">WINS!!!</span>`
  } else {
    messageEl.innerHTML = `<span style="color: red; font-size: 5vmin; margin-right: 3vmin;">${ICONS[turn]}</span> <span style="font-size: 5vmin;">It's Your Go!</span>`
  }
}

function renderControls() {
  restartbtn.style.visibility = winner ? 'visible' : 'hidden'

  // boardSpaces.forEach(function(columnArray, columnIndex) { // looping over each item of array and each array its self
  //   columnArray.forEach(function(rowValue, rowIndex){
  //     const boardSpace = `c${columnIndex}r${rowIndex}`
  //     const boardEl = document.getElementById(boardSpace)
  //     boardEl
  //   })
  // });
}
