const fileSystem = require('fs');

const point = {x: 0, y : 0};

console.log("begin");

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

fileSystem.writeFileSync("testSync.txt", JSON.stringify(point));
const data = fileSystem.readFileSync("testSync.txt");
console.log(JSON.parse(data));
console.log("end");

const fileCtrl = require("./fileController");

fileCtrl.writeFileCustom("test.txt", "test exports");
fileCtrl.readFileCustom("test.txt");

