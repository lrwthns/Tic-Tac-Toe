const gameController = (() => {
    const winningMessage = document.querySelector('#winning-message');
    const winningMessageText = document.querySelector('#winning-message-text');
    const restart = document.querySelector('#restart-button');
    let round = 1;
    let gameIsOver = false; 
    let draw = false;
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
    const checkWin = (arr) => {
        let win = winningCombinations.some(combination => {
            return combination.every(index => {
                return arr[index] == playerOne.symbol;
            }) ? true :
            combination.every(index => {
                return arr[index] == playerTwo.symbol;
            }) ? true : false;
        })  
        if (gameController.round == 10 && win == false) {
            win = true;
            draw = true;
        }
        console.log(win);
        gameIsOver = win;
        endGame();  
    }
    const endGame = () => { 
        if (gameIsOver == true) {
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
    restart.addEventListener('click', () => {
        gameController.round = 1;
        gameIsOver = false;
        draw = false;
        gameboard.gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        gameboard.grids.forEach(grid => {
            grid.textContent = ' ';
        })
        winningMessage.style.display = 'none';
    })  
    return {
        round, 
        checkWin
    }
})();

const gameboard = (() => {
    const grids = document.querySelectorAll('.singleGrid')
    // grids.forEach((grid) => {
    //     grid.style.display = 'none';
    // }) 
    let gameArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    grids.forEach((grid, index) => {
        grid.addEventListener('click', () => {
            if (gameboard.gameArray[index] == ' ') {
                if (gameController.round % 2 != 0) {
                    gameboard.gameArray[index] = playerOne.symbol;
                } else {
                    gameboard.gameArray[index] = playerTwo.symbol;
                }
                grid.textContent = gameboard.gameArray[index];
                gameController.round++;
                gameController.checkWin(gameboard.gameArray);
            }
        })  
    })
    return {
        gameArray,
        grids
    };    
})();

const playerFactory = (name, symbol) => {
    return { name, symbol };
};
let playerOne = playerFactory('Cookie', 'x');
let playerTwo = playerFactory('Brownie', 'o');

// const form = document.querySelector('form');
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let playerOneName = document.querySelector('#playerOne').value;
//     let playerTwoName = document.querySelector('#playerTwo').value;
//     playerOne = playerFactory(playerOneName, 'x');
//     playerTwo = playerFactory(playerTwoName, 'o');
//     form.style.display = 'none';
//     gameboard.grids.forEach(grid => {
//         grid.style.display = 'block';
//     }) 
// });



































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

