//suits and values
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    cardValue = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

//DOM variables
let textArea = document.getElementById("text-area"),
    newGameButton = document.getElementById("newGameButton"),
    hitButton = document.getElementById("hitButton"),
    stayButton = document.getElementById("stayButton");

//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//hide buttons until new game has started
hitButton.style.display = 'none';
stayButton.style.display = 'none';
blackjack();

newGameButton.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = makeDeck();
    shuffle(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    blackjack();
});

hitButton.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    blackjack();
});

stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    blackjack();
});


function makeDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let cardValueIndex = 0; cardValueIndex < cardValue.length; cardValueIndex++) {
            //make each card an object
            let card = {
                suit: suits[suitIndex],
                value: cardValue[cardValueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }
}

function cardToString(card) {
    return card.value + " of " + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    playerScore = getScore(playerCards);
    dealerScore = getScore(dealerCards);
}

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        //dealer takes cards
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            PlayerWon = false;
        }
    }
}

function blackjack() {
    if (!gameStarted) {
        textArea.innerText = "Let's play Blackjack";
        return;
    }

    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += cardToString(dealerCards[i]) + '\n';
    }

    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += cardToString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText = "Dealer has:\n" + dealerCardString + "(score: " + dealerScore + ")\n\n" +
        "Player has:\n" + playerCardString + "(score: " + playerScore + ")\n\n";

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "You won! Congratulations!";
        } else {
            textArea.innerText += "You Lost! Better luck next time!"
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}