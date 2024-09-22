import { createShowdown } from './showdown.js';
import { evalHands } from './hand_evaluation.js';
import { convertHand } from './hand_conversion.js';
import { convertBoard } from './board_conversion.js';

export function equity(players, board) {

    // Nombre de showdown généré aléatoirement
    let SIMULATION = 1000000;

    // Conversion des différentes cartes
    let playersHand = convertHand(players);
    let boardCards = convertBoard(board);

    // Initialisation des tableaux pour compter le nombre de victoire
    let win = new Array(players.length + 1).fill(0); // le + 1 correspond au nombre de Tie
    let winRate = new Array(players.length + 1); // le + 1 correspond au pourcentage de Tie

    for (let simulation = 0; simulation < SIMULATION; simulation++) {
        // Créer un showdown aléatoire en fonction des différentes mains et du board
        let showdown = createShowdown(playersHand, boardCards)

        // Récupère l'index du joueur gagnant la main
        let bestHandIndex = evalHands(playersHand, showdown);

        win[bestHandIndex]++;
    }

    // Calcul du winRate
    for (let player = 0; player < win.length; player++) {
        winRate[player] = Math.round(win[player] / SIMULATION * 10000) / 10000;
    }

    return winRate
}