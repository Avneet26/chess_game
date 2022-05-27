let gameState = [];
let piecePicked = false;

function init() {
    generateInitBoard();
}
init();

function generateInitBoard() {
// Board Generator
    for(let r = 1; r <= 8; r++) {
        for(let c = 1; c <= 8; c++){
            const box = document.createElement('div');
            box.classList.add('chess-box');
            box.setAttribute('data-row', r);
            box.setAttribute('data-col', c);
            
            if (r % 2 !== 0 && c % 2 !== 0) {
                box.classList.add('box_white');
            } else if (r % 2 !== 0 && c % 2 == 0) {
                box.classList.add('box_black');
            } else if (r % 2 == 0 && c % 2 !== 0) {
                box.classList.add('box_black');
            } else {
                box.classList.add('box_white');
            }

            document.querySelector('.board').insertAdjacentElement('beforeend', box);
        }
    }
    generatePieces();
}

function generatePieces() {
//Piece Arrangement Gen
    document.querySelectorAll('.chess-box').forEach((ele) => {
        if (ele.getAttribute('data-row') == "2") {
            ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece pawn_black" />');
        } else if (ele.getAttribute('data-row') == "7") {
            ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece pawn_white" />');
        } else if (ele.getAttribute('data-row') == "1") {
            if (ele.getAttribute('data-col') == "1" || ele.getAttribute('data-col') == "8") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece rook_black" />');
            } else if (ele.getAttribute('data-col') == "2" || ele.getAttribute('data-col') == "7") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece knight_black" />');
            } else if (ele.getAttribute('data-col') == "3" || ele.getAttribute('data-col') == "6") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece bishop_black" />');
            } else if (ele.getAttribute('data-col') == "4") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece queen_black" />');
            } else if (ele.getAttribute('data-col') == "5") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece king_black" />');
            }
        } else if (ele.getAttribute('data-row') == "8") {
            if (ele.getAttribute('data-col') == "1" || ele.getAttribute('data-col') == "8") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece rook_white" />');
            } else if (ele.getAttribute('data-col') == "2" || ele.getAttribute('data-col') == "7") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece knight_white" />');
            } else if (ele.getAttribute('data-col') == "3" || ele.getAttribute('data-col') == "6") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece bishop_white" />');
            } else if (ele.getAttribute('data-col') == "5") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece queen_white" />');
            } else if (ele.getAttribute('data-col') == "4") {
                ele.insertAdjacentHTML('afterbegin', '<div class="chess_piece king_white" />');
            }
        }
    });
    updateGameState();
    insertEventPieces();
}

function updateGameState() {
    gameState = [];
    for (let r = 1; r <= 8; r++) {
        let rowArr = [];
        for(let c = 1; c <= 8; c++) {
            let pieceInfo;
            let box = document.querySelector(`.chess-box[data-row="${r}"][data-col="${c}"]`);
            if (box.querySelectorAll('.chess_piece').length > 0) {
                pieceInfo = box.querySelector('.chess_piece').classList[1];
            } else {
                pieceInfo = 'no_no';
            }
            let piece_id;
            let pieceClr;
            switch (pieceInfo.split('_')[0]) {
                case "pawn": piece_id = 'pn'    
                    break;
                case "rook": piece_id = 'rk'
                    break;
                case "bishop": piece_id = 'bp'
                    break;
                case "king": piece_id = 'kg'
                    break;
                case "queen": piece_id = 'qn'
                    break;
                case "knight": piece_id = 'kt'
                    break            
                default: piece_id = 'no'
            }
            switch (pieceInfo.split("_")[1]) {
                case "white": pieceClr = 'w'
                    break;
                case "black": pieceClr = 'b'
                    break;
                default: pieceClr = 'n'
            }
            const boxObj = {
                hasPiece: (piece_id == 'no')? false : true,
                row: r,
                col: c,
                p_id: piece_id,
                color: pieceClr
            }

            rowArr.push(boxObj);
        }
        gameState.push(rowArr);
    }
    console.log(gameState);
}

function insertEventPieces() {
    document.querySelectorAll('.chess-box').forEach(piece => {
        piece.addEventListener('mouseup', (ev) => {
            clickPieceHandler(ev);
        });
    })
}