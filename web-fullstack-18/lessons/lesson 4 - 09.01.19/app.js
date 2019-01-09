const fileSystem = require('fs');

const point = {x: 0, y : 0};

fileSystem.writeFile("test.txt", "push string",  (error) => {
    console.log(error || ("write file success!"));
});

fileSystem.writeFile("test.txt", JSON.stringify(point),  (error) => {
    console.log(error || ("write file success!"));
});

fileSystem.readFile("test.txt", {encoding: "utf-8"}, (error, data) => {
    console.log( error ||  data);
    console.log(error || (JSON.parse(data).x));
});

