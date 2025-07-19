const h1 = document.createElement('h1');
document.body.appendChild(h1);
h1.innerText = 'Card Matching Game';

const mainBox = document.createElement('div');
document.body.appendChild(mainBox);
mainBox.classList.add('mainBox');

const button = document.createElement('button');
document.body.appendChild(button);
button.innerText = 'Restart';

let emojis = ['⚖️', '🔋', '🔫', '🧲', '💎', '📷', '💴', '🎁'];

function shuffleEmojis() {
    const doubleEmojis = [...emojis, ...emojis];
    doubleEmojis.sort(() => Math.random() - 0.5);
    return doubleEmojis;
}

let lockBox = false;
let flipped = [];
let doubleEmojis = shuffleEmojis();

mainBox.innerHTML = '';
doubleEmojis.forEach((emoji) => {
    const box = document.createElement('div');
    mainBox.appendChild(box);
    box.classList.add('box');
    box.innerText = '';
    box.dataset.emoji = emoji;
});

mainBox.addEventListener('click', (e) => {
    const clicked = e.target;
    if (!clicked.classList.contains('box') || lockBox || clicked.classList.contains('flipped') || clicked.classList.contains('matched')) return;

    clicked.classList.add('flipped');
    clicked.innerText = clicked.dataset.emoji;
    flipped.push(clicked);

    if (flipped.length === 2) {
        lockBox = true;
        const [box1, box2] = flipped;

        if (box1.dataset.emoji === box2.dataset.emoji) {
            box1.classList.add('matched');
            box2.classList.add('matched');
            flipped = [];
            lockBox = false;
        } else {
            setTimeout(() => {
                box1.classList.remove('flipped');
                box2.classList.remove('flipped');
                box1.innerText = '';
                box2.innerText = '';
                flipped = [];
                lockBox = false;
            }, 1000);
        }

        const allMatch = document.querySelectorAll('.matched');
        const allBox = document.querySelectorAll('.box');

        if (allMatch.length === allBox.length) {
            setTimeout(() => {
                alert('🏆 You Win!');
            }, 300);
        }
    }
});

button.addEventListener('click', () => {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach((box) => {
        box.classList.remove('flipped', 'matched');
        box.innerText = '';
    });
});
