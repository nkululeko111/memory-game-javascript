document.addEventListener("DOMContentLoaded", () => {
    const cards = [
        'Z', 'Z', 'K', 'K', 'J', 'J', 'D', 'D',
        'Q', 'Q', 'F', 'F', '0', '0', 'H', 'H'
    ];

    const gameBoard = document.getElementById('game-board');
    let flippedCards = [];
    let matchedCards = 0;

    // Shuffle the cards
    shuffle(cards);

    // Create card elements
    cards.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${letter}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flip')) {
            this.classList.add('flip');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.letter === card2.dataset.letter) {
            matchedCards += 2;
            flippedCards = [];
            if (matchedCards === cards.length) {
                setTimeout(() => alert('You win!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                flippedCards = [];
            }, 1000);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
