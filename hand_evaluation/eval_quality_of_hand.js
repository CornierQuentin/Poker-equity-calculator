import { maxOfArray } from "../util/max_of_arrays.js";

export function qualityOfHand(hand, showdown) {
    /*
    Cette fonction va renvoyer une valeur numérique qui correspond à la valeur de la meilleure combinaison de carte 
    et un identifiant permettant d'évaluer la combinaison

    hand: [ [12, 2], [9, 1] ]
    showdown: [ [11, 3], [5, 2], [8, 2], [3, 1], [3, 4] ]

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
        Four of kind -> n, x: valeur du carré et valeur de la dernière carte
        Straight Flush -> n: valeur de la meilleur carte
    */

    // Créér un tableau avec les 7 cartes permettant de faire une main
    let cards = hand.concat(showdown);

    let valueOccurence = new Array(15).fill(0);
    let suitOccurence = new Array(5).fill(0);

    for (let card = 0; card < cards.length; card++) {
        valueOccurence[cards[card][0]]++;
        suitOccurence[cards[card][1]]++;
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
    for (let start = 1; start < 11; start++) {
        let isAStraight = true;
        if (start !== 1) {
            for (let card = start; card < start + 5; card++) {
                if (valueOccurence[card] === 0) {
                    isAStraight = false;
                    break;
                }
            }
        } else if (valueOccurence[14] > 0) {
            for (let card = start + 1; card < start + 5; card++) {
                if (valueOccurence[card] === 0) {
                    isAStraight = false;
                    break;
                }
            }
        } else {
            isAStraight = false;
        }
        if (isAStraight) {
            straight = true;
            break;
        }
    }

    let flush = suitMaxProperties[0] >= 5;

    let fullHouse = valueMaxProperties[0] === 3;
    if (fullHouse) {
        let fullHouseValue = valueMaxProperties[2][0];
        let fullHouseOccurence = new Array(15).fill(0);

        for (let card = 0; card < cards.length; card++) {
            if (cards[card][0] !== fullHouseValue) {
                fullHouseOccurence[cards[card][0]]++;
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
        let suit = suitMaxProperties[2][0];

        for (let start = 14; start > 4; start--) {
            let isAStraight = true;
            for (let card = start; card > start - 5; card--) {
                if (valueOccurence[card] === 0 || !isCardInCards([card, suit], cards)) {
                    isAStraight = false;
                    break;
                }
            }
            if (isAStraight === true) {
                straight = true;
                return [9, [start]];
            }
        }
        if (valueOccurence[14] > 0 && isCardInCards([14, suit], cards)) {
            let isAStraight = true;
            for (let card = 5; card > 1; card--) {
                if (valueOccurence[card] === 0 || !isCardInCards([card, suit], cards)) {
                    isAStraight = false;
                    break;
                }
            }
            if (isAStraight === true) {
                straight = true;
                return [9, [5]];
            }
        }
    }
    if (fourOfKind) {
        let four = valueMaxProperties[2][0];
        let max = 2;

        for (let card = 0; card < cards.length; card++) {
            if (cards[card][0] > max && cards[card][0] !== four) {
                max = cards[card][0];
            } 
        }
        return [8, [four, max]]
    } else if (fullHouse) {
        let threeOfKindValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let pairValue = 0;
        for (let value = 2; value < 15; value++) {
            if (valueOccurence[value] >= 2 && value !== threeOfKindValue) {
                pairValue = value;
            }
        }
        return [7, [threeOfKindValue, pairValue]]
    } else if (flush) {
        let suit = suitMaxProperties[2][0];

        let max = [2, 2, 2, 2, 2];

        for (let card = 0; card < cards.length; card++) {
            if (cards[card][0] > max[0] && cards[card][1] === suit) {
                max = [cards[card][0], max[0], max[1], max[2], max[3]];
            } 
        }
        return [6, [max[0], max[1], max[2], max[3], max[4]]];
    } else if (straight) {
        for (let start = 14; start > 4; start--) {
            let isAStraight = true;
            for (let card = start; card > start - 5; card--) {
                if (valueOccurence[card] === 0) {
                    isAStraight = false;
                    break;
                }
            }
            if (isAStraight === true) {
                straight = true;
                return [5, [start]];
            }
        }
        return [5, [5]]
    } else if (threeOfKind) {
        let threeOfKindValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let max = [2, 2];

        for (let card = 2; card < 15; card++) {
            if (card !== threeOfKindValue && valueOccurence[card] > 0) {
                max = [card, max[0]];
            }
        }

        return [4, [threeOfKindValue, max[0], max[1]]];
    } else if (twoPair) {
        let pair_one = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let pair_two = valueMaxProperties[2][valueMaxProperties[2].length - 2];
        let max = 2;
        for (let card = 0; card < 15; card++) {
            if (valueOccurence[card] > 0 && card !== pair_one && card !== pair_two) {
                max = card;
            }
        }

        return [3, [pair_one, pair_two, max]];
    } else if (pair) {
        let pairValue = valueMaxProperties[2][valueMaxProperties[2].length - 1];
        let max = [2, 2, 2];

        for (let card = 2; card < 15; card++) {
            if (card !== pairValue && valueOccurence[card] > 0) {
                max = [card, max[0], max[1]];
            }
        }

        return [2, [pairValue, max[0], max[1], max[2]]];
    } else {
        let max = [2, 2, 2, 2, 2];
        for (let card = 0; card < 15; card++) {
            if (valueOccurence[card] > 0) {
                max = [card, max[0], max[1], max[2], max[3]];
            }
        }

        return [1, [max[0], max[1], max[2], max[3], max[4]]];
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