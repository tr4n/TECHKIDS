'use strict'

function quickSort(array, first, second) {
    if (first >= second) return;
    var left = first,
        right = second,
        mid = parseInt((first + second) >> 1);
    while (left < right) {
        while (array[left] < array[mid]) left++;
        while (array[right] > array[mid]) right--;

        if (left <= right) {
            if (left < right) {
                var temp = array[left];
                array[left] = array[right];
                array[right] = temp;
            }
            left++;
            right--;
        }

    }

    if (first < right) quickSort(array, first, right);
    if (left < second) quickSort(array, left, second);
}

function sort(input) {
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    quickSort(input, 0, input.length - 1);
    return input;
}

module.exports = sort