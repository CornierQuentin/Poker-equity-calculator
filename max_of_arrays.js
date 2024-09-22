export function maxOfArray(array) {
    /*
    maxOfArray renvoi :
        [valeur_max, nombre de fois qu'il y a cette valeur, [liste des index ayant la valeur max]]
    */
    let max = -Infinity;
    let occurenceMax = 0;
    let indexOfMax = [];

    for (let element = 0; element < array.length; element++) {
        if (array[element] > max) {
            max = array[element];
            occurenceMax = 1;
            indexOfMax = [element];
        } else if (array[element] === max) {
            occurenceMax++;
            indexOfMax.push(element);
        }
    }

    return [max, occurenceMax, indexOfMax];
}