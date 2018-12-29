'use strict'
/*
function binarySearch(sortedArray, first, second, value){
    var valueMid = sortedArray[(left + right) >> 1]; 
    var left = first, right = second; 
    while(left <= right){
        var mid = (left + right) >> 1; 
        if(value < sortedArray[mid]) right = mid -1;
        else if(value > sortedArray[mid] ) right = mid + 1; 
        else return mid; 
    }
    return -1; 

}

function quickSort(array, first, second) {
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

function getNotFoundElement(array) {
    var value = array[parseInt(array.length >> 1)];
    var map = {};
    array.forEach((item, index) => {
        map[item] = 1998;
    });
    while (map[value] == 1998) {
        value++;
    }
    return value;
}
*/


function search(input, target) {
    input.forEach((item, index) => {
        if (item == target) return index;
    });
    return -1;
}

module.exports = search