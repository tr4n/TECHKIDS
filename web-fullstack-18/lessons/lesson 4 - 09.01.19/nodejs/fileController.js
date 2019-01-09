const fileSystem = require('fs');

const writeFileCustom = (path, data) => {
    fileSystem.writeFileSync(path, data);
}
const readFileCustom = (path) => {
    let data = fileSystem.readFileSync(path);
    console.log("File: " + path + " : " + data);
    return data;
}

module.exports = {
    writeFileCustom,
    readFileCustom
}