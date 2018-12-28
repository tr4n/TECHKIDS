'use strict'


function search(input, target) {
    var position = -1;
    for (var index = 0; index < input.length; index++) {
        if (input[index] == target) {
            position = index;
            break;
        }
    }
    return position;
}

module.exports = search