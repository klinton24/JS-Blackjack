let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let cardValues = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

function makeDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let cardValueIndex = 0; cardValueIndex < cardValues.length; cardValueIndex++) {
            //make each card an object
            let card = {
                suit: suits[suitIndex],
                value: cardValues[cardValueIndex]
            };
            deck.push(card);
        }
    }
}

function cardToString(card) {
    return cardvalue + " of " + card.suit;
}

let deck = makeDeck();

console.log(deck.length);
console.log(deck);