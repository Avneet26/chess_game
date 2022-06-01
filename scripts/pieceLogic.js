let pieceSelected;
let legalMoves;

function clickPieceHandler(e) {
    let clickedBox = e.currentTarget;
    let row = e.currentTarget.getAttribute('data-row');
    let col = e.currentTarget.getAttribute('data-col');

    if (piecePicked === false) {
        if (gameState[row - 1][col - 1].hasPiece){
            piecePicked = true;
            pieceSelected = clickedBox.querySelector('.chess_piece');
            pieceSelected.classList.add('active-piece');
            console.log('pick click', pieceSelected);
            returnLegalMoves({
                piece: gameState[row - 1][col - 1].p_id,
                row: row - 1,
                col: col - 1,
                color: gameState[row - 1][col - 1].color
            });
        }
    } else {
        if (!gameState[row - 1][col - 1].hasPiece || gameState[pieceSelected.closest('.chess-box').getAttribute('data-row') - 1][pieceSelected.closest('.chess-box').getAttribute('data-col') - 1].color != gameState[row - 1][col - 1]){
            piecePicked = false;
            if (gameState[row - 1][col - 1].hasPiece) {
                clickedBox.querySelector('.chess_piece').remove();
            }
            clickedBox.insertAdjacentElement('afterbegin', pieceSelected);
            document.querySelectorAll('.chess-box').forEach(box => {
                box.classList.remove('last-moved-piece');
            });
            console.log('drop click', pieceSelected);
            document.querySelector('.active-piece').classList.remove('active-piece');
            clickedBox.classList.add('last-moved-piece');
            removelegalInd();
            updateGameState();
        }
    }
}

function returnLegalMoves(pieceObj) {
    let movesArr = [];
    console.log(pieceObj);
    //pawn
    if (pieceObj.piece == 'pn' && pieceObj.color == 'w'){
        for (let c = -1; c <= 1; c++){
            movesArr.push([pieceObj.row - 1, pieceObj.col + c]);
        }
    } else if (pieceObj.piece == 'pn' && pieceObj.color == 'b'){
        for (let c = -1; c <= 1; c++){
            movesArr.push([pieceObj.row + 1, pieceObj.col + c]);
        }
    }
    updateLegalOnBoard(movesArr);
}

function removelegalInd() {
    document.querySelectorAll('.chess-box').forEach(box => {
        box.classList.remove('legal-move-indicator');
    });
}

function updateLegalOnBoard(movesArr) {
    legalMoves = movesArr;
    console.log(movesArr);
    
    for(let i = 0; i < movesArr.length; i++){
        document.querySelector(`.chess-box[data-row="${movesArr[i][0] + 1}"][data-col="${movesArr[i][1] + 1}"]`)
            .classList.add('legal-move-indicator');
    }
}