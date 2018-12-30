const fs = require('fs');
/* fs.writeFile('test.txt', 'Hello world', (err) => {
    if (err) console.log(err);
    else console.log("Write file success!");
});
console.log("End wirte file");
 */

fs.readFile('test.txt', (err, data) => {
    if (err) console.log(err);
    else console.log("read file success! Data: " + data);
});
console.log("End read file");

fs.writeFileSync