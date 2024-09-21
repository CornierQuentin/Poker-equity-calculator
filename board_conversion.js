export function convertBoard(board) {
    /*
    On récupère le board sous la forme :
        ["Ac", "6h", "Tc", ...]

    On veut utliser des valeurs chiffrées donc on va convertir chaque carte en une liste de deux éléments
        "Ac" -> [14, 3]

    Liste des équivalences :
        1 -> 1
        2 -> 3
        ...
        9 -> 9
        T -> 10
        J -> 11
        Q -> 12
        K -> 13
        A -> 14

        et 

        h -> 1
        s -> 2
        c -> 3
        d -> 4
    */

    let convertedBoard = new Array(board.length);

    for (let card = 0; card < board.length; card++) {
        let suit = 0;
        let value = 0;

        let stringValue = board[card][0];
        let stringSuit = board[card][1];

        switch (stringValue) {
            case "A":
                value = 14;
                break;
            case "K":
                value = 13;
                break;
            case "Q":
                value = 12;
                break;
            case "J":
                value = 11;
                break;
            case "T":
                value = 10;
                break;
            default:
                value = parseInt(stringValue);
        }

        switch (stringSuit) {
            case "h":
                suit = 1;
                break;
            case "s":
                suit = 2;
                break;
            case "c":
                suit = 3;
                break;
            case "d":
                suit = 4;
                break;
        }

        convertedBoard[card] = [value, suit];
    }

    return convertedBoard;
}