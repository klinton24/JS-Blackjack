let deck = [];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let cardValues = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let cardValueIndex = 0; cardValueIndex < cardValues.length; cardValueIndex++) {
        deck.push(cardValues[cardValueIndex] + " of " + suits[suitIndex]);
    }
}

console.log(deck.length);
console.log(deck);
