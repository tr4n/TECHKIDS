var Length = parseInt(20 * Math.random());
var arr = [];
for (var index = 0; index < Length; index++) {
    arr[index] = parseInt(1000 * Math.random()) - 500;
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

function getSortedArray(array, first, second) {
    var tempArray = array;
    quickSort(tempArray, 0, array.length - 1);
    return tempArray;

}

function getIndex(array, value) {
    var position = -1;
    for (var index = 0; index < array.length; index++) {
        if (array[index] == value) {
            position = index;
            break;
        }
    }
    return position;
}

var randomTest = parseInt(10 * Math.random());
const INSIDE = 0,
    OUTSIDE = 1;
var mode = randomTest < 2 ? OUTSIDE : INSIDE;
var number = 0,
    index = 0;
if (mode == OUTSIDE) {
    number = 501 + parseInt(100 * Math.random());
    index = -1;
} else {
    index = parseInt(Length * Math.random());
    number = arr[index];
}



console.log(arr);
console.log(getSortedArray(arr));
console.log(number);
console.log(index);
console.log(getIndex(arr, number));