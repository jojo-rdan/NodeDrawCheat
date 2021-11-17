const fs = require('fs');
const {variation} = require('./variation')
let cache = {};
const textData = async (req, res) => {
    const {letters, n} = req.query;
    const array = letters.split('');
    const number = Number(n);
    const results = [];
    try {
        if(Object.keys(cache).length === 0){
            let data = await fs.readFileSync('./words.txt', 'utf8');
            data = data.replace(/\r?\n/g," ");
            data = data.replace(/[ ]+/g," ");
            data = data.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
            data = data.trim().toLowerCase();
            data = data.split(' ');
            for (const iterator of data) {
                if(!cache[iterator[0]]) cache[iterator[0]] = {};
                cache[iterator[0]][iterator] = true;
            } 
        }
        const letterVariations = variation(array, number);
        for (const iterator of letterVariations) {
            if(cache[iterator[0]][iterator]){
                if(results.indexOf(iterator) === -1){
                    results.push(iterator);
                }
            }
        }
        res.status(200).json(results);
    } catch(err) {
        res.status(404).send(err)
        console.log(err);
    }
}
module.exports = {
    textData
}