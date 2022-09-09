const startBtn = document.querySelector('.start-btn');
const cellCount = document.querySelector('input');
const startContainer = document.querySelector('.start-container');
const gameContainer = document.querySelector('.game-container');
const scoreBoard = document.querySelector('.score');

let boardSize = 0;
let score = 0;

function createBoard(boardSize) {
    if (boardSize >= 11) {
        alert("Max board size exceeded")
        return
    }
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('button');

        findMine(cell)

        gameContainer.append(cell);
    }

    setRandomMine()

    gameContainer.classList.add('show-game-container');

    gameContainer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    startContainer.style.display = "none";
    gameContainer.style.display = "block";
}


function findMine(cell) {
    cell.addEventListener('click', () => {
        if (cell.getAttribute('data-mine')) {
            cell.classList.add('mine');

            gameContainer.childNodes.forEach(node => {
                node.disabled = true;
                console.log(node);
                if (node.getAttribute('data-mine')) {
                    node.classList.add('mine');
                }
            })

            setTimeout(() => {
                gameContainer.classList.remove("show-game-container");
                gameContainer.style.display = "none";
                gameContainer.innerHTML = '';

                startContainer.style.display = "flex";
                scoreBoard.textContent = score;
                score = 0;
            }, 2000)

        } else {
            cell.classList.add('not-mine');
            score += 1;
        }
    });
}

function setRandomMine() {
    let randomMineCount = Math.ceil(boardSize * boardSize * 0.1);

    for (let i = 0; i < randomMineCount; i++) {
        let randomMine = Math.floor(Math.random() * boardSize * boardSize);
        let tempRandomMine = 0;

        if (randomMine === tempRandomMine) {
            randomMine = Math.floor(Math.random() * boardSize * boardSize);
        }

        tempRandomMine = randomMine;

        gameContainer.childNodes[randomMine].setAttribute('data-mine', 'isMine');
    }
}

startBtn.addEventListener('click', () => {

    if (!Number(cellCount.value)) {
        cellCount.classList.add('input-error');
        setTimeout(() => {
            cellCount.classList.remove('input-error');
        }, 3000)
    } else {
        boardSize = cellCount.value;
        createBoard(boardSize);
    }

    cellCount.value = '';
});