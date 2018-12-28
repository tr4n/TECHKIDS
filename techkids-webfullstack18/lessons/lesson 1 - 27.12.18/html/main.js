var array = [1, 5, 3, 4, 2, 3, 4];
var length = array.length;


console.log(array);
for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
        if (array[i] > array[j]) {
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;


        }
    }
}

console.log(array);