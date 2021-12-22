
function SquaresDifference(freqAlph, freqCipheredString, shift) {
    let sum = 0
    for (let i = 0; i < 26; i++)
        sum += Math.pow(
            freqAlph[String.fromCharCode('a'.charCodeAt(0) + i)]
            - freqCipheredString[String.fromCharCode('a'.charCodeAt(0) + (i + shift) % 26)], 2);
    return sum;
}

function determineShift(freqAlph, freqCipheredString) {
    let shift = 0;
    let minDif = SquaresDifference(freqAlph, freqCipheredString, 0);
    for (let i = 1; i < 26; i++) {
        let currentDif = SquaresDifference(freqAlph, freqCipheredString, i);
        if (currentDif < minDif) {
            minDif = currentDif;
            shift = i;
        }
    }

    return shift;
}

function decipher(cipheredString, shift) {
    let decipheredString = "";
    for (let i = 0; i < cipheredString.length; i++) {
        let currentSymbol = cipheredString[i].toLowerCase();
        if (currentSymbol.charCodeAt(0) < 'a'.charCodeAt(0) || currentSymbol.charCodeAt(0) > 'z'.charCodeAt(0)) {
            decipheredString += currentSymbol;
            continue;
        }
        let addShift = 0;
        if (currentSymbol.charCodeAt(0) > cipheredString[i].charCodeAt(0))
            addShift = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);
        let codeOfCurrentSymbol = 'a'.charCodeAt(0)
            + addShift
            + (currentSymbol.charCodeAt(0) - 'a'.charCodeAt(0) + (26 - shift)) % 26;
        decipheredString += String.fromCharCode(codeOfCurrentSymbol);
    }

    fs.writeFileSync('decoded.txt', decipheredString);
}

let arg = process.argv;
let fs = require('fs');
let key = arg[3];
let input = fs.readFileSync("coded.txt").toString();
let out = '';

if (arg[2] == 'code') {
    for (let i=0; i<input.length; i++){
        if(input[i].match(/^([a-zA-Z]+)$/i)) {
            if ((input.charCodeAt(i) - key < 97 && input.charCodeAt(i) >= 97) || (input.charCodeAt(i) - key < 65 && input.charCodeAt(i) >= 65)) {
                out += String.fromCharCode(input.charCodeAt(i) + 26 - key)
            } else {
                out += String.fromCharCode(input.charCodeAt(i) - key)
            }
        }
        else{
            out+=input[i];
        }
    }
    fs.writeFileSync('code.txt', out);
}

//
else if (arg[2] =='decode') {
    //заносим данные канонических частот
    let freqAlph = new Array();
    let alph = fs.readFileSync('alph.txt', 'utf8').split('\r\n');
    for (let i = 0; i < alph.length; i++) {
        let letter = alph[i].split(' ')[0];
        let freq = alph[i].split(' ')[1];
        freqAlph[letter] = parseFloat(freq);
    }

    let cipheredString = fs.readFileSync('code.txt', 'utf8');

    //считаем фактическую частоту
    let freqCipheredString = new Array();
    for (let i = 0; i < 26; i++)
        freqCipheredString[String.fromCharCode('a'.charCodeAt(0) + i)] = 0;

    let count = 0;
    for (let i = 0; i < cipheredString.length; i++) {
        let currentSymbol = cipheredString[i].toLowerCase();
        if (currentSymbol.charCodeAt(0) < 'a'.charCodeAt(0) || currentSymbol.charCodeAt(0) > 'z'.charCodeAt(0))
            continue;
        freqCipheredString[currentSymbol]++;
        count++;
    }

    for (let i = 0; i < 26; i++)
        freqCipheredString[String.fromCharCode('a'.charCodeAt(0) + i)] =
            freqCipheredString[String.fromCharCode('a'.charCodeAt(0) + i)]
            / count
            * 100;

    
    let shift = determineShift(freqAlph, freqCipheredString);
    decipher(cipheredString, shift);
}