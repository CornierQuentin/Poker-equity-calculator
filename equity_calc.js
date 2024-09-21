import { createShodown } from './shodown.js';
import {evalHands} from './hand_evaluation.js';

export function equity(players, board) {

    let SIMULATION = 10000;

    let win = new Array(players.length).fill(0);
    let winRate = new Array(players.length);

    for (let simulation = 0; simulation < SIMULATION; simulation++) {
        let shodown = createShodown(board);

        let bestHandIndex = evalHands(players, shodown);

        win[bestHandIndex]++;
    }

    for (let player = 0; player < players.length; player++) {
        winRate[player] = win[player] / SIMULATION;
    }

    return winRate
}