'use strict'


const NOT_FOUND = -1,
    FIRST_INDEX = 1,
    LAST_INDEX = 2,
    MIDDLE_INDEX = 3,
    MAX_VALUE = 19981;
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
function createArray(length, maxValue, unsign) {
    var array = [];
    while (length-- > 0) {
        var element = 
            unsign == true ? 4 + parseInt(maxValue * Math.random()) 
                            : parseInt(2 * maxValue * Math.random()) - maxValue;

        array.push(element);

    }
    return array;
}

function createObject(arrayLength, mode) {
    var obj = { "input": [], "target": MAX_VALUE, "output": NOT_FOUND };
    var input = createArray(arrayLength, MAX_VALUE, false);
    var target = MAX_VALUE,
        output = NOT_FOUND;
    //  quickSort(input, 0, input.length - 1);
    input.sort();
    switch (mode) {
        case NOT_FOUND:
            //  target = getNotFoundElement(input);
            target = MAX_VALUE + parseInt(Math.random() * 10 + 2);
            output = NOT_FOUND;
            break;
        case FIRST_INDEX:
            target = input[0];
            output = 0;
            output = input.indexOf(target);
            break;
        case LAST_INDEX:
            output = arrayLength - 1;
            target = input[arrayLength - 1];
            output = input.indexOf(target);
            break;
        case MIDDLE_INDEX:
            output = arrayLength > 2 ? 1 + parseInt(Math.random() * (arrayLength - 2)) : 0;
            target = input[output];
            output = input.indexOf(target);
            break;
    }

    obj["input"] = input;
    obj["target"] = target;
    obj["output"] = output;
    return obj;



}

function getRandomMode() {
    var rand = Math.random() * 100;
    return rand < 10 ? NOT_FOUND : rand < 40 ? FIRST_INDEX : rand < 70 ? LAST_INDEX : MIDDLE_INDEX;
}

function generate(testLengthArray) {
    var lengths = [];
    //  lengths = createArray(testLengthArray.length, 100, true);
    lengths = testLengthArray;
    var generatedArray = [];

    if (lengths.length >= 4) {
        generatedArray.push(createObject(lengths[0], NOT_FOUND));
        generatedArray.push(createObject(lengths[1], FIRST_INDEX));
        generatedArray.push(createObject(lengths[2], LAST_INDEX));
        generatedArray.push(createObject(lengths[3], MIDDLE_INDEX));

        for (var index = 4; index < lengths.length; index++) {
            generatedArray.push(createObject(lengths[index], getRandomMode()));
        }

    } else {
        lengths.forEach(element => {
            generatedArray.push(createObject(element, getRandomMode()));
        });

    }



    //  console.log(generatedArray);
    return generatedArray;
}

module.exports = generate
