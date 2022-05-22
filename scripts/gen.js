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
