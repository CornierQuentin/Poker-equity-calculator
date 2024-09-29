import { maxOfArray } from "../util/max_of_arrays.js";

export function compareHands(handInformation, handToCompare, bestHandQuality) {
    /*
    handInformation: un tableau de tableau correspondant au retour de la fonction qualityOfHand
    handToCompare: tableau des indeices des joueur à comparés dans handInformation
    bestHandQuality: un entier qui correspond à la meilleur qualité de main (cf. eval_quality_of_hand.js)
    */
    if (bestHandQuality === 1) {
        let hands = handToCompare;
        for (let card = 0; card < 5; card++) {
            let valueOfCard = new Array(hands.length).fill(0);
            for (let player = 0; player < hands.length; player++) {
                valueOfCard[player] = handInformation[hands[player]][card];
            }

            let maxProperties = maxOfArray(valueOfCard);
            if (maxProperties[1] === 1) {
                return hands[maxProperties[2][0]];
            } else {
                let newHands = new Array(maxProperties[2].length);

                for (let hand = 0; hand < newHands.length; hand++) {
                    newHands[hand] = hands[maxProperties[2][hand]];
                }

                hands = newHands;
            }
        }

        return handInformation.length;
    } else if (bestHandQuality === 2) {
        let hands = handToCompare;
        let valueOfPair = new Array(hands.length).fill(0);
        for (let player = 0; player < hands.length; player++) {
            valueOfPair[player] = handInformation[hands[player]][0];
        }

        let pairMaxProperties = maxOfArray(valueOfPair);
        if (pairMaxProperties[1] === 1) {
            return hands[pairMaxProperties[2][0]];
        } else {
            let newHands = new Array(pairMaxProperties[2].length);

            for (let hand = 0; hand < newHands.length; hand++) {
                newHands[hand] = hands[pairMaxProperties[2][hand]]
            }

            hands = newHands;

            for (let card = 1; card < 4; card++) {
                let valueOfCard = new Array(hands.length).fill(0);
                for (let player = 0; player < hands.length; player++) {
                    valueOfCard[player] = handInformation[hands[player]][card];
                }
    
                let maxProperties = maxOfArray(valueOfCard);
                if (maxProperties[1] === 1) {
                    return hands[maxProperties[2][0]];
                } else {
                    let newHands = new Array(maxProperties[2].length);
    
                    for (let hand = 0; hand < newHands.length; hand++) {
                        newHands[hand] = hands[maxProperties[2][hand]];
                    }
    
                    hands = newHands;
                }
            }

            return handInformation.length
        }
    } else if (bestHandQuality === 3) {
        let hands = handToCompare;
        let valueOfPairOne = new Array(hands.length).fill(0);
        for (let player = 0; player < hands.length; player++) {
            valueOfPairOne[player] = handInformation[hands[player]][0];
        }

        let pairOneMaxProperties = maxOfArray(valueOfPairOne);

        if (pairOneMaxProperties[1] === 1) {
            return hands[pairOneMaxProperties[2][0]];
        } else {
            let newHands = new Array(pairOneMaxProperties[2].length);

            for (let hand = 0; hand < newHands.length; hand++) {
                newHands[hand] = hands[pairOneMaxProperties[2][hand]]
            }

            hands = newHands;

            let valueOfPairTwo = new Array(hands.length).fill(0);
            for (let player = 0; player < hands.length; player++) {
                valueOfPairTwo[player] = handInformation[hands[player]][1];
            }

            let pairTwoMaxProperties = maxOfArray(valueOfPairTwo);

            if (pairOneMaxProperties[1] === 1) {
                return handToCompare[pairTwoMaxProperties[2][0]];
            } else {
                let newHands = new Array(pairTwoMaxProperties[2].length);

                for (let hand = 0; hand < newHands.length; hand++) {
                    newHands[hand] = hands[pairTwoMaxProperties[2][hand]]
                }

                hands = newHands;

                let valueOfCard = new Array(hands.length).fill(0);
                for (let player = 0; player < hands.length; player++) {
                    valueOfCard[player] = handInformation[handToCompare[player]][2];
                }

                let maxProperties = maxOfArray(valueOfCard);

                if (maxProperties[1] === 1) {
                    return handToCompare[maxProperties[2][0]];
                } else {
                    return handInformation.length
                }
            }
        }
    } else if (bestHandQuality === 4) {
        let hands = handToCompare;
        let valueOfThree = new Array(hands.length).fill(0);
        for (let player = 0; player < hands.length; player++) {
            valueOfThree[player] = handInformation[hands[player]][0];
        }

        let threeMaxProperties = maxOfArray(valueOfThree);

        if (threeMaxProperties[1] === 1) {
            return handToCompare[threeMaxProperties[2][0]];
        } else {
            let newHands = new Array(threeMaxProperties[2].length);

            for (let hand = 0; hand < newHands.length; hand++) {
                newHands[hand] = hands[threeMaxProperties[2][hand]]
            }

            hands = newHands

            for (let card = 1; card < 3; card++) {
                let valueOfCard = new Array(hands.length).fill(0);
                for (let player = 0; player < hands.length; player++) {
                    valueOfCard[player] = handInformation[hands[player]][card];
                }
    
                let maxProperties = maxOfArray(valueOfCard);
                if (maxProperties[1] === 1) {
                    return handToCompare[maxProperties[2][0]];
                } else {
                    let newHands = new Array(maxProperties[2].length);

                    for (let hand = 0; hand < newHands.length; hand++) {
                        newHands[hand] = hands[maxProperties[2][hand]];
                    }

                    hands = newHands;
                }
            }

            return handInformation.length
        }
    } else if (bestHandQuality === 5) {
        let valueOfStraight = new Array(handToCompare.length).fill(0);
        for (let player = 0; player < handToCompare.length; player++) {
            valueOfStraight[player] = handInformation[handToCompare[player]][0];
        }

        let straightMaxProperties = maxOfArray(valueOfStraight);

        if (straightMaxProperties[1] === 1) {
            return handToCompare[straightMaxProperties[2][0]];
        } else {
            return handInformation.length
        }
    } else if (bestHandQuality === 6) {
        let valueOfFlush = new Array(handToCompare.length).fill(0);
        for (let player = 0; player < handToCompare.length; player++) {
            valueOfFlush[player] = handInformation[handToCompare[player]][0];
        }

        let flushMaxProperties = maxOfArray(valueOfFlush);

        if (flushMaxProperties[1] === 1) {
            return handToCompare[flushMaxProperties[2][0]];
        } else {
            return handInformation.length
        }
    } else if (bestHandQuality === 7) {
        let hands = handToCompare;
        let valueOfFull = new Array(hands.length).fill(0);
        for (let player = 0; player < hands.length; player++) {
            valueOfFull[player] = handInformation[handToCompare[player]][0];
        }

        let fullMaxProperties = maxOfArray(valueOfFull);

        if (fullMaxProperties[1] === 1) {
            return handToCompare[fullMaxProperties[2][0]];
        } else {
            let newHands = new Array(fullMaxProperties[2].length);

            for (let hand = 0; hand < newHands.length; hand++) {
                newHands[hand] = hands[fullMaxProperties[2][hand]]
            }

            hands = newHands;

            let valueOfPair = new Array(hands.length).fill(0);
            for (let player = 0; player < hands.length; player++) {
                valueOfPair[player] = handInformation[hands[player]][1];
            }

            let maxProperties = maxOfArray(valueOfPair);
            if (maxProperties[1] === 1) {
                return handToCompare[maxProperties[2][0]];
            } else {
                return handInformation.length;
            }
        }
    } else if (bestHandQuality === 8) {
        let hands = handToCompare;
        let valueOfFour = new Array(handToCompare.length).fill(0);
        for (let player = 0; player < handToCompare.length; player++) {
            valueOfFour[player] = handInformation[handToCompare[player]][0];
        }

        let fourMaxProperties = maxOfArray(valueOfFour);

        if (fourMaxProperties[1] === 1) {
            return handToCompare[fourMaxProperties[2][0]];
        } else {
            let newHands = new Array(fourMaxProperties[2].length);

            for (let hand = 0; hand < newHands.length; hand++) {
                newHands[hand] = hands[fourMaxProperties[2][hand]]
            }

            hands = newHands;

            let valueOfCard = new Array(hands.length).fill(0);
            for (let player = 0; player < hands.length; player++) {
                valueOfCard[player] = handInformation[hands[player]][1];
            }

            let maxProperties = maxOfArray(valueOfCard);
            if (maxProperties[1] === 1) {
                return hands[maxProperties[2][0]];
            } else {
                return handInformation.length;
            }
        }
    } else {
        let valueOfSF = new Array(handToCompare.length).fill(0);
        for (let player = 0; player < handToCompare.length; player++) {
            valueOfSF[player] = handInformation[handToCompare[player]][0];
        }

        let SFMaxProperties = maxOfArray(valueOfSF);

        if (SFMaxProperties[1] === 1) {
            return handToCompare[SFMaxProperties[2][0]];
        } else {
            return handInformation.length
        }
    }
}