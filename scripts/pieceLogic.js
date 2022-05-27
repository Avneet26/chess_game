let pieceSelected;

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
        }
    } else {
        if (!gameState[row - 1][col - 1].hasPiece || gameState[pieceSelected.closest('.chess-box').getAttribute('data-row') - 1][pieceSelected.closest('.chess-box').getAttribute('data-col') - 1].color != gameState[row - 1][col - 1]){
            piecePicked = false;
            if (gameState[row - 1][col - 1].hasPiece) {
                clickedBox.querySelector('.chess_piece').remove();
            }
            clickedBox.insertAdjacentElement('afterbegin', pieceSelected);
            console.log('drop click', pieceSelected);
            document.querySelector('.active-piece').classList.remove('active-piece');
            updateGameState();
        }
    }
}