export function createShowdown(playersHand, board) {

    let showdown = new Array(5);

    for (let card = 0; card < board.length; card++) {
        showdown[card] = board[card];
    }

    for (let card = board.length; card < 5; card++) {
        let value = randomInt(14);
        let suit = randomInt(4);

        let cardNotInplay = !isCardInShowdown([value, suit], showdown) && !isCardInPlayersHand([value, suit], playersHand);

        while (!cardNotInplay) {
            value = randomInt(14);
            suit = randomInt(4);

            cardNotInplay = !isCardInShowdown([value, suit], showdown) && !isCardInPlayersHand([value, suit], playersHand);
        }

        showdown[card] = [value, suit]
    }

    return showdown;
}

function isCardInShowdown(card, showdown) {

    let isIn = false

    for (let cardInShowdonw = 0; cardInShowdonw < showdown.length; cardInShowdonw++) {
        if (!(showdown[cardInShowdonw] !== null)) {
            if (card[0] == showdown[cardInShowdonw][0] && card[1] == showdown[cardInShowdonw][1]) {
                isIn = true;
                break;
            }
        }
    }

    return isIn;
} 

function isCardInPlayersHand(card, playersHand) {

    let isIn = false

    for (let player = 0; player < playersHand.length; player++) {
        for (let playerCard = 0; playerCard < 2; playerCard++) {
            if (card[0] == playersHand[player][playerCard][0] && card[1] == playersHand[player][playerCard][1]) {
                isIn = true;
                break;
            }
        }
    }

    return isIn;
} 

function randomInt(n) {
    return Math.floor(Math.random() * n) + 1;
}