'use strict'


function search(input, target) {
    input.forEach((item, index) => {
        if (item == target) return index;
    });
    return -1;
}

module.exports = search