const form = document.querySelector('form');

let playerOne, playerTwo;

const playerFactory = (name, symbol) => {
    return { name, symbol };
};

const gameController = (() => {
    const turnMessage = document.querySelector('#turn-message');
    const winningMessage = document.querySelector('#winning-message');
    const winningMessageText = document.querySelector('#winning-message-text');
    const restart = document.querySelector('#restart-button');
    let round = 1;
    let gameIsOver = false; 
    let draw = false;
    const changeTurnMessage = (roundValue) => { 
        if (roundValue % 2 != 0) {
            return turnMessage.textContent = `It's ${playerOne.name}'s turn!`;
        } else {
            return turnMessage.textContent = `It's ${playerTwo.name}'s turn!`;
        }
    }; 
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    //logic that checks for the winner
    const checkWin = (arr) => {
        let win = winningCombinations.some(combination => {
            return combination.every(index => {
                return arr[index] == playerOne.symbol;
            }) ? true :
            combination.every(index => {
                return arr[index] == playerTwo.symbol;
            }) ? true : false;
        })
        //logic that checks if it's a draw  
        if (gameController.round == 10 && win == false) {
            win = true;
            draw = true;
        }
        console.log(win);
        gameIsOver = win;
        endGame();  
    }
    //shows winning message
    const endGame = () => { 
        if (gameIsOver == true) {
            gameController.turnMessage.textContent = '';
            winningMessage.style.display = 'flex';
            if (draw == true) {
                winningMessageText.textContent = 'It\'s a draw!';
            } else if (gameController.round % 2 == 0) {
                winningMessageText.textContent = `${playerOne.name} wins!`;
            } else {
                winningMessageText.textContent = `${playerTwo.name} wins!`;
            }
        }
    }
    //when player clicks restart it goes here
    restart.addEventListener('click', () => {
        gameController.round = 1;
        gameIsOver = false;
        draw = false;
        gameboard.gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        gameboard.grids.forEach(grid => {
            grid.textContent = ' ';
        })
        winningMessage.style.display = 'none';
        gameController.turnMessage.textContent = `It's ${playerOne.name}'s turn!`;
    })  
    return {
        turnMessage,
        changeTurnMessage,
        round, 
        checkWin
    }
})();

const gameboard = (() => {
    const grids = document.querySelectorAll('.singleGrid')
    grids.forEach((grid) => {
        grid.style.display = 'none';
    }) 
    //where the x's and o's are stored
    let gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    grids.forEach((grid, index) => {
        grid.addEventListener('click', () => {
            //this makes sure player can only put x's and o's on an empty grid
            if (gameboard.gameArray[index] == ' ') {
                if (gameController.round % 2 != 0) {
                    gameboard.gameArray[index] = playerOne.symbol;
                } else {
                    gameboard.gameArray[index] = playerTwo.symbol;
                }
                grid.textContent = gameboard.gameArray[index];
                gameController.round++;
                gameController.changeTurnMessage(gameController.round);
                gameController.checkWin(gameboard.gameArray);
            }
        })  
    })
    return {
        gameArray,
        grids
    };    
})();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let playerOneName = document.querySelector('#playerOne').value;
    let playerTwoName = document.querySelector('#playerTwo').value;
    playerOne = playerFactory(playerOneName, 'x');
    playerTwo = playerFactory(playerTwoName, 'o');
    form.style.display = 'none';
    gameController.turnMessage.textContent = `It's ${playerOne.name}'s turn!`;
    gameboard.grids.forEach(grid => {
        grid.style.display = 'block';
    }) 
});



































// const Gameboard = (() => {
//     let gameboard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
//     return gameboard;
// })();

// const displayController = (() => {

// })();

// const playerFactory = () => { 
    
// }

// let displayGameboard = (arr) => {
//     const display = document.querySelector('#display');
//     for (let i = 0; i < arr.length; i++) {
//         let grid = document.createElement('div');
//         grid.classList.add('singleGrid');
//         display.appendChild(grid);
//         let txt = '';
//         txt += arr[i];
//         grid.innerHTML = txt;
//     }
// } 

// let game = Gameboard;
// displayGameboard(Gameboard);

