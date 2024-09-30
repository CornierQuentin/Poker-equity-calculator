import { maxOfArray } from "../util/max_of_arrays.js";
import { qualityOfHand } from "./eval_quality_of_hand.js";
import { compareHands } from "./hand_comparison.js";

export function evalHands(playersHands, showdown) {
    /*
    playersHands: [ [ [12, 2], [9, 1] ], [ [7, 2], [11, 2] ], ... ]
    showdown: [ [11, 3], [5, 2], [8, 2], [3, 1], [3, 4] ]
    */

    // Qualité de la main (eg. un brelan)
    let handQuality = new Array(playersHands.length);
    // Information relative à la qualité de la main (eg. [9, 12, 7] -> un brelan de 9 avec Q et 7 pour autre carte)
    let handInformation = new Array(playersHands.length);

    for (let player = 0; player < playersHands.length; player++) {
        let handValue, additionnalInformation;
        [handValue, additionnalInformation] = qualityOfHand(playersHands[player], showdown);
        handQuality[player] = handValue;
        handInformation[player] = additionnalInformation;
    }

    /*
    maxOfArray renvoi :
        [valeur_max, nombre de fois qu'il y a cette valeur, [liste des index ayant la valeur max]]
    */
    let maxProperties = maxOfArray(handQuality);
    
    if (maxProperties[1] === 1) { // Si une seule personne à la meilleure qualité
        return maxProperties[2][0];
    } else { // Sinon on compare les informations sur la main

        let bestHandQuality = maxProperties[0];

        return compareHands(handInformation, maxProperties[2], bestHandQuality);
    }
}