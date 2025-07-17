const gameBoard = document.querySelector('#game-board');

const emojis = ["😮‍💨", "😵‍💫", "😲", "😰", "🗿", "👋", "👻", "🤡"];
const emojisPair = [...emojis, ...emojis];
emojisPair.sort(() => Math.random() - 0.5);

emojisPair.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerText = "";
    gameBoard.appendChild(card);
});

let flippedCards = [];
let lockBoard = false;

gameBoard.addEventListener('click', (e) => {
    const clicked = e.target;

    if (!clicked.classList.contains('card') || lockBoard || clicked.classList.contains('matched') || flippedCards.includes(clicked)) {
        return;
    }
    
clicked.innerText = clicked.dataset.emoji;
    clicked.classList.add('flipped');
    flippedCards.push(clicked);

    if (flippedCards.length === 2) {
        lockBoard = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                card1.innerText = "";
                card2.innerText = "";
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 800);
        }
    }
});