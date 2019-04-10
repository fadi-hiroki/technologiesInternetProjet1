const fs = require('fs');
const path = require('path');
const validations = require("./validations.js");

module.exports = {
    letter(data) {
        if(!validations.validPEM(data.dest)) {
            return false;
        } else {
            let letter = {
                dest: data.dest,
                msg: data.msg
            }
            return letter;
        }
    },
    getLetters() {
        return  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/messages.json'))).messages;
    }, 
    putLetters(letters) {
        fs.writeFileSync(path.resolve(__dirname, '../database/messages.json'), JSON.stringify({messages:letters}));
    },
    getPeers() {
        return  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/peers.json'))).peers;
    },  
}