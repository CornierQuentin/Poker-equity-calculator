import { concatenateCardToBoard, createRandomShowdown, getAvailableCards, getNextDraw } from './showdown/showdown.js';
import { evalHands } from './hand_evaluation/hand_evaluation.js';
import { convertHand } from './conversion/hand_conversion.js';
import { convertBoard } from './conversion/board_conversion.js';

export function equity(players, board) {

    // Conversion des différentes cartes
    let playersHand = convertHand(players);
    let boardCards = convertBoard(board);

    // Initialisation des tableaux pour compter le nombre de victoire
    let win = new Array(players.length + 1).fill(0); // le + 1 correspond au nombre de Tie
    let winRate = new Array(players.length + 1); // le + 1 correspond au pourcentage de Tie

    let availableCards = getAvailableCards(playersHand, boardCards);
    let numberOfCardsToDraw = 5 - board.length;

    let cardIndex = new Array(numberOfCardsToDraw);

    for (let i = 0; i < cardIndex.length; i++) {
        cardIndex[i] = i;
    }

    let endOfSimulation = false;
    let numberOfSimulation = 0;

    while (!endOfSimulation) {
        // Créer un showdown aléatoire en fonction des différentes mains et du board
        let showdown = concatenateCardToBoard(availableCards, cardIndex, boardCards);

        // Récupère l'index du joueur gagnant la main
        let bestHandIndex = evalHands(playersHand, showdown);

        endOfSimulation = getNextDraw(cardIndex, availableCards);
        numberOfSimulation++;

        win[bestHandIndex]++;
    }

    // Calcul du winRate
    for (let player = 0; player < win.length; player++) {
        winRate[player] = Math.round(win[player] / numberOfSimulation * 10000) / 10000;
    }

    return winRate
}