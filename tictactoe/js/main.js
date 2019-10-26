/*----- app's state (variables) -----*/
let turn, winner, board, stillPlaying;
/*----- cached element references -----*/
let grid = document.querySelector('.grid-container');
let playAgain = document.getElementById('reset');
let cells = document.querySelectorAll('.grid-container div');
let title = document.querySelector('h1');
/*----- event listeners -----*/
reset.addEventListener('click', init);
grid.addEventListener('click', handleClick);
/*----- functions -----*/
init();

//function to assign 1 user to 'X' and 1 user to "O"
function convertToChar(num) {
    return num < 0 ? 'X' : 'O';
}
//swtich between user "1" and user "-1"
function switchTurn() {
    return turn < 0 ? 1 : -1;
}

function init() {
    //generates random starting user
    turn = genRandomNum();
    //set winner to none
    winner = null;
    //set inner array to hold 0's
    clearBoard();
    //remove X's and O's from display
    clearGUIBoard();
    //set playing to true
    stillPlaying = 0;
}

function clearGUIBoard() {
    cells.forEach((e) => {
        e.innerHTML = ''
    });
    title.innerText = "TIC TAC TOE"
}

function clearBoard() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
}

function render() {
    if (winner) {
        title.innerText = `CONGRATS! PLAYER ${turn} YOU WON!`
    }
}
//if the user clicks the screen and the target is not a "div" tag or if the user clicks on the X or O already places on the screen, return out of function..
function handleClick(evt) {
    if (evt.target.tagName !== 'DIV' || !!evt.target.innerHTML) {
        return;
    }

    let evtId = evt.target.id;
    let column = evtId[3];
    let row = evtId[1];
    //iterate through each cell element and check to see if the item that the user clicked is the correct element. if so, and there is a winner or the board is full, return.  otherwise assign the inner HTML to a char 'X' or 'O', also se the value of the row and column to the 1 or -1 that defines the user ID, and run the gameLogic function.
    cells.forEach((e) => {
        if (evtId === e.id) {
            if (winner || board[row][column]) {
                return;
            }

            e.innerHTML = `<p>${convertToChar(turn)}</p>`;
            board[row][column] = turn;
            console.log(board[row][column]);
            stillPlaying++
            gameLogic();
            render()
        }

    });
    //if game is still ongoing, swtich turns on every click.
    turn = switchTurn();
}
//function to determine starting user (1 or -1)
function genRandomNum() {
    let random = Math.floor(Math.random() * 2);
    return random ? 1 : -1;
}
//function to determine the index of the rows and columns of the board.
function boardPosition(column, row) {
    return board[column][row];
}

//gameLogic function loops through the nested array to determine if the summed values accross the grid horizontally, vertically, or diagnally are equal to 3. If so, there is a winner. 
function gameLogic() {

    let diagnalCountRightLeft = 0;
    let diagnalCountLeftRight = 0;
    for (let col = 0; col < 3; col++) {
        diagnalCountLeftRight += board[col][col];
        diagnalCountRightLeft += board[col][2 - col];

        let verticalCount = 0
        let horizontalCount = 0;

        for (let row = 0; row < 3; row++) {
            verticalCount += board[row][col];
            horizontalCount += board[col][row];

            if (Math.abs(verticalCount) === 3 || Math.abs(horizontalCount) === 3 || Math.abs(diagnalCountRightLeft) === 3 || Math.abs(diagnalCountLeftRight) === 3) {
                winner = turn;
                console.log(winner, 'winner');

                return;
            } else {

                if (!winner && stillPlaying === 9) {

                    title.innerText = "ITS A TIE!"
                }
            }
        }

    }
}


