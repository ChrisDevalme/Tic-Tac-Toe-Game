Tic Tac Toe Game

Description:

This is a simple implementation of the classic Tic Tac Toe game using HTML, CSS, and JavaScript. The game allows two players to take turns marking spaces on a 3x3 grid with 'X' and 'O' symbols. The first player to have three of their symbols in a row (horizontally, vertically, or diagonally) wins the game. If the grid is filled without a winner, the game ends in a draw.

How to Play:

Open the index.html file in your web browser.
Players take turns clicking on empty spaces on the game board to place their symbol ('X' or 'O').
The game ends when one player achieves three in a row or when the board is full.
The winner is displayed at the bottom, and the score is tallied on the top.
Click the "Restart" button to start a new game.
Features

Two-player turn-based gameplay.
Win detection for horizontal, vertical, and diagonal combinations.
Tally of player scores with a "Best of 5" feature.

Files

- index.html: The main HTML file containing the game board and interface.
- style.css: The CSS file styling the appearance of the game.
- script.js: The JavaScript file containing the game logic and functionality.
Code Structure

The JavaScript code is organized into sections:

- State Variables: Keeping track of game state, player scores, and the game board.
- Cached Elements: Storing references to HTML elements for easy access.
- Event Listeners: Handling user interactions such as clicks on the game board or restart button.
- Functions: Implementing various game functions, including handling player moves, checking for a winner, updating the score, and restarting the game.