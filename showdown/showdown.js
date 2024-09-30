export function createRandomShowdown(playersHand, board) {
    /*
    Cette fonction renvoi un showdown aléatoire en fonction des mains des joueurs et du board actuel
    Le showdown est sous la forme d'un tableau de carte
    */

    let showdown = new Array(5).fill(0);

    for (let card = 0; card < board.length; card++) {
        showdown[card] = board[card];
    }

    for (let card = board.length; card < 5; card++) { // Pour chaque carte qu'il reste à tiré
        let value = randomInt(2, 14);
        let suit = randomInt(1, 4);

        let cardNotInplay = !isCardInShowdown([value, suit], showdown) && !isCardInPlayersHand([value, suit], playersHand);

        while (!cardNotInplay) { // Si la carte à déjà été tiré
            value = randomInt(2, 14);
            suit = randomInt(1, 4);

            cardNotInplay = !isCardInShowdown([value, suit], showdown) && !isCardInPlayersHand([value, suit], playersHand);
        }

        showdown[card] = [value, suit]
    }

    return showdown;
}

export function getAvailableCards(playersHand, board) {
    let availableCards = new Array(13*4 - 2*playersHand.length - board.length);
    let cardIndex = 0;

    for (let value = 2; value < 15; value++) {
        for (let suit = 1; suit < 5; suit++) {
            if (!isCardInShowdown([value, suit], board) && !isCardInPlayersHand([value, suit], playersHand)) {
                availableCards[cardIndex] = [value, suit];
                cardIndex++;
            }
        }
    }

    return availableCards;
}

export function getNextDraw(previousDraw, availableCards) {
    let numberOfCards = previousDraw.length;

    for (let cardIndex = 1; cardIndex <= numberOfCards; cardIndex++) {
        if (previousDraw[numberOfCards - cardIndex] < availableCards.length - cardIndex) {
            previousDraw[numberOfCards - cardIndex]++;

            for (let cardsLeft = numberOfCards - cardIndex + 1; cardsLeft < numberOfCards; cardsLeft++) {
                previousDraw[cardsLeft] = previousDraw[numberOfCards - cardIndex] + cardsLeft - numberOfCards + cardIndex;
            }
            return false;
        }
    }

    return true;
}

export function concatenateCardToBoard(availableCards, cardIndex, board) {
    let showdown = board.slice();
    
    for (let index = 0; index < cardIndex.length; index++) {
        showdown.push(availableCards[cardIndex[index]]);
    }

    return showdown;
}

/***********************************************************************************************************************************/
// Fonctions Auxiliaires

function isCardInShowdown(card, showdown) {
    /*
    Fonction qui permet de savoir si une carte spécifique (eg. [13,2]) est présente dans le showdown actuel
    */

    let isIn = false

    for (let cardInShowdonw = 0; cardInShowdonw < showdown.length; cardInShowdonw++) {
        if (showdown[cardInShowdonw] !== 0) {
            if (card[0] == showdown[cardInShowdonw][0] && card[1] == showdown[cardInShowdonw][1]) {
                isIn = true;
                break;
            }
        }
    }

    return isIn;
} 

function isCardInPlayersHand(card, playersHand) {
    /*
    Fonction qui permet de savoir si une carte spécifique (eg. [13,2]) est présente dans les mains des joueurs
    */

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

function randomInt(min, max) {
    /*
    Fonction qui renvoi un entier aléatoire entre min (inclu) et max (inclu)
    */
    return Math.floor(Math.random() * (max - min + 1)) + min;
}