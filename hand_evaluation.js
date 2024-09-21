import { maxOfArray } from "./max_of_arrays.js";
import { qualityOfHand } from "./eval_quality_of_hand.js";
import { compareHands } from "./hand_comparison.js";

export function evalHands(playersHands, showdown) {
    let handQuality = new Array(playersHands.length);
    let handInformation = new Array(playersHands.length);

    for (let player = 0; player < playersHands.length; player++) {
        let handValue, additionnalInformation;
        [handValue, additionnalInformation] = qualityOfHand(playersHands[player], showdown);
        handQuality[player] = handValue;
        handInformation[player] = additionnalInformation;
    }

    let maxProperties = maxOfArray(handQuality);
    
    if (maxProperties[1] === 1) {
        return maxProperties[2][0];
    } else {
        let bestHandQuality = handQuality[maxProperties[0]];

        return compareHands(handInformation, maxProperties[2], bestHandQuality);
    }
}