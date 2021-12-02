let fs = require('fs');
let arg = process.argv;
let str;
let substr;
let sumT = 0;
let sumS = 0;
data = new Array();

str = fs.readFileSync(arg[2]);
str = str.toString();
    
substr = fs.readFileSync(arg[3]);
substr = substr.toString();

for (let i = 0; i < substr.length; i++){
    sumT += substr.charCodeAt(i)**2;
}

for (let i = 0; i < substr.length; i++){
    sumS += str.charCodeAt(i)**2;
}

for (let i = 1; i < str.length - substr.length + 2; i++){
    if (sumS === sumT) {
        let a = -1;
        let k = 0;
        for (let j = 1; j < substr.length + 1; j++){
            a++;
            if (substr[j - 1] === str[a + i - 1]) {
                k++;
            }
            else break;
        }
        if (k === substr.length) {
            data.push(i);
        }
    }
    sumS = sumS - str.charCodeAt(i - 1)**2 + str.charCodeAt(i + substr.length - 1)**2;
}
console.log(data);