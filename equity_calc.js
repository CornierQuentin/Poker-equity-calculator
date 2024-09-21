import { createShowdown } from './showdown.js';
import { evalHands } from './hand_evaluation.js';
import { convertHand } from './hand_conversion.js';
import { convertBoard } from './board_conversion.js';

export function equity(players, board) {

    let SIMULATION = 10000;

    let playersHand = convertHand(players);
    let boardCards = convertBoard(board);

    let win = new Array(players.length).fill(0);
    let winRate = new Array(players.length);

    for (let simulation = 0; simulation < SIMULATION; simulation++) {
        let showdown = createShowdown(playersHand, boardCards)

        let bestHandIndex = evalHands(playersHand, showdown);

        win[bestHandIndex]++;
    }

    for (let player = 0; player < players.length; player++) {
        winRate[player] = win[player] / SIMULATION;
    }

    return winRate
}