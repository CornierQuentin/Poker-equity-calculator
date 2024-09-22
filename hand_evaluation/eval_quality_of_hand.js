import { maxOfArray } from "../util/max_of_arrays.js";

export function qualityOfHand(hand, showdown) {
    /*
    Cette fonction va renvoyer une valeur numérique qui correspond à la valeur de la meilleure combinaison de carte 
    et un identifiant permettant d'évaluer la combinaison

    Liste des équivalences :
        High cards -> 1
        Pair -> 2
        Two pair -> 3
        Three of kind -> 4
        Straight -> 5
        Flush -> 6
        Full house -> 7
        Four of kind -> 8
        Straight flush -> 9

    Liste des informations selon la combinaison :
        High Cards -> a, b, c, d, e: valeur des plus haute carte
        Pair -> n, x, y, z: valeur de la pair puis valeur des cartes
        Two Pair -> n, m, x: valeur de la pair une, valeur de la pair deux et dernière cartes
        Three of kind -> n, x, y: valeur du brelan puis des autres cartes
        Straight -> n: valeur de la dernière carte
        Flush -> a, b, c, d, e: valeur des plus haute carte
        Full house -> n, m: valeur du brelan puis valeur de la pair
        Four of kind -> n: valeur du carré
        Straight Flush -> n: valeur de la meilleur carte
    */

    // Créér un tableau avec les 7 cartes permettant de faire une main
    let cards = hand.concat(showdown);

    let valueOccurence = new Array(14).fill(0);
    let suitOccurence = new Array(4).fill(0);

    for (let card = 0; card < cards.length; card++) {
        valueOccurence[cards[card][0] - 1]++;
        suitOccurence[cards[card][1] - 1]++;
    }

    /*
    maxOfArray renvoi :
        [valeur_max, nombre de fois qu'il y a cette valeur, [liste des index ayant la valeur max]]
    */
    let valueMaxProperties = maxOfArray(valueOccurence);
    let suitMaxProperties = maxOfArray(suitOccurence);

    /***********************************************************************************************************************/
    /* On détermine quel sont les types de mains que l'on a */

    let pair = valueMaxProperties[0] >= 2;
    let twoPair = (valueMaxProperties[0] === 2 && valueMaxProperties[1] > 1);
    let threeOfKind = valueMaxProperties[0] === 3;

    let straight = false;
    for (let start = 0; start < 9; start++) {
        let isAStraight = true;
        for (let card = start; card < start + 5; card++) {
            if (valueOccurence[card] === 0) {
                isAStraight = false;
                break;
            }
        }
        if (isAStraight) {
            straight = true;
            break;
        }
    }

    let flush = suitMaxProperties[0] >= 5;

    let fullHouse = valueMaxProperties[0] >= 3;
    if (fullHouse) {
        let fullHouseValue = valueMaxProperties[2][valueMaxProperties[1] - 1] + 1;
        let fullHouseOccurence = new Array(14).fill(0);

        for (let card = 0; card < cards.length; card++) {
            if (cards[card][0] !== fullHouseValue) {
                fullHouseOccurence[cards[card][0] - 1]++;
            }
        }

        let maxFullHousProperties = maxOfArray(fullHouseOccurence);
        fullHouse = maxFullHousProperties[0] >= 2;
    } 

    let fourOfKind = valueMaxProperties[0] === 4;

    let straightFlush = straight && flush;

    /***********************************************************************************************************************/
    /* On va renvoyer la meilleur main avec ses information */

    if (straightFlush) {
        let suit = suitMaxProperties[2][0] + 1;

        for (let start = 13; start > 4; start--) {
            let isAStraight = true;
            for (let card = start; card > start - 5; card--) {
                if (valueOccurence[card] === 0 || !isCardInCards([card + 1, suit], cards)) {
                    isAStraight = false;
                    break;
                }
            }
            if (isAStraight === true) {
                straight = true;
                return [9, [start + 1]];
            }
        }
    }
    if (fourOfKind) {
        return [8, [valueMaxProperties[2][0] + 1]]
    } else if (fullHouse) {
        let threeOfKindValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let pairValue = 0;
        for (let value = 0; value < 14; value++) {
            if (valueOccurence[value] >= 2 && value !== threeOfKindValue) {
                pairValue = value;
            }
        }
        return [7, [threeOfKindValue + 1, pairValue + 1]]
    } else if (flush) {
        let suit = suitMaxProperties[2][0] + 1;

        let max = 2;

        for (let card = 0; card < cards.length; card++) {
            if (cards[card][0] > max && cards[card][1] === suit) {
                max = cards[card][0];
            } 
        }
        return [6, [max]];
    } else if (straight) {
        for (let start = 13; start > 4; start--) {
            let isAStraight = true;
            for (let card = start; card > start - 5; card--) {
                if (valueOccurence[card] === 0) {
                    isAStraight = false;
                    break;
                }
            }
            if (isAStraight === true) {
                straight = true;
                return [5, [start + 1]];
            }
        }
    } else if (threeOfKind) {
        let threeOfKindValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let max = [2, 2];

        for (let card = 0; card < 14; card++) {
            if (card !== threeOfKindValue && valueOccurence[card] > 0) {
                max = [card, max[0]];
            }
        }

        return [4, [threeOfKindValue + 1, max[0] + 1, max[1] + 1]];
    } else if (twoPair) {
        let pair_one = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let pair_two = valueMaxProperties[2][valueMaxProperties[2].length - 2];
        let max = 2;
        for (let card = 0; card < 14; card++) {
            if (valueOccurence[card] > 0 && card !== pair_one && card !== pair_two) {
                max = card;
            }
        }

        return [3, [pair_one + 1, pair_two + 1, max + 1]];
    } else if (pair) {
        let pairValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let max = [2, 2, 2];

        for (let card = 0; card < 14; card++) {
            if (card !== pairValue && valueOccurence[card] > 0) {
                max = [card + 1, max[0], max[1]];
            }
        }

        return [2, [pairValue, max[0] + 1, max[1] + 1, max[2] + 1]];
    } else {
        let max = [2, 2, 2, 2, 2];
        for (let card = 0; card < 14; card++) {
            if (valueOccurence[card] > 0) {
                max = [card, max[0], max[1], max[2], max[3]];
            }
        }

        return [1, [max[0] + 1, max[1] + 1, max[2] + 1, max[3] + 1, max[4] + 1]];
    }
}

function isCardInCards(card, cards) {
    /*
    Fonction qui permet de savoir si une carte spécifique (eg. [13,2]) est présente dans les 7 cartes
    */

    let isIn = false

    for (let cardInCards = 0; cardInCards < cards.length; cardInCards++) {
        if (card[0] == cards[cardInCards][0] && card[1] == cards[cardInCards][1]) {
            isIn = true;
            break;
        }
    }

    return isIn;
} 