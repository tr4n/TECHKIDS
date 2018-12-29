'use strict'

var ObjectGenerator = {
    NOT_FOUND: -1,
    FIRST_INDEX: 1,
    LAST_INDEX: 2,
    MIDDLE_INDEX: 3,
    MAX_VALUE: 19981,
    createArray: function(length, maxValue, unsign) {
        var array = [];
        while (length-- > 0) {
            var element =
                unsign == true ? 4 + parseInt(maxValue * Math.random()) :
                parseInt(2 * maxValue * Math.random()) - maxValue;

            array.push(element);

        }
        return array;
    },
    getRandomMode: function() {
        var rand = Math.random() * 100;
        return rand < 10 ? NOT_FOUND : rand < 40 ? FIRST_INDEX : rand < 70 ? LAST_INDEX : MIDDLE_INDEX;
    },
    createObject: function(arrayLength, mode) {
        var input = this.createArray(arrayLength, MAX_VALUE, false);
        var target = MAX_VALUE,
            output = NOT_FOUND;
        input.sort();
        switch (mode) {
            case NOT_FOUND:
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
        return {
            "input": input,
            "target": target,
            "output": output
        }
    },
    generateArray(lengths) {
        var generatedArray = [];

        if (lengths.length >= 4) {
            generatedArray.push(ObjectGenerator.createObject(lengths[0], NOT_FOUND));
            generatedArray.push(ObjectGenerator.createObject(lengths[1], FIRST_INDEX));
            generatedArray.push(ObjectGenerator.createObject(lengths[2], LAST_INDEX));
            generatedArray.push(ObjectGenerator.createObject(lengths[3], MIDDLE_INDEX));

            for (var index = 4; index < lengths.length; index++) {
                generatedArray.push(ObjectGenerator.createObject(lengths[index], ObjectGenerator.getRandomMode()));
            }

        } else {
            lengths.forEach(element => {
                generatedArray.push(ObjectGenerator.createArray(element, ObjectGenerator.getRandomMode()));
            });

        }
        return generatedArray;
    }

}

function generate(testLengthArray) {

    return ObjectGenerator.generateArray(testLengthArray);
}

module.exports = generate