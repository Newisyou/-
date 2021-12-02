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
    sumT += substr.charCodeAt(i)*Math.pow(2,substr.length-i-1);
    sumS += str.charCodeAt(i)*Math.pow(2,substr.length-i-1);
}

for (let i = 0; i < str.length - substr.length + 1; i++){
    if (sumS === sumT) {
        let j = 0;
        while (substr[j] == str[i + j]) {
            j++;
            if (j === substr.length) {
                data.push(i);
                break;
            }
        }
    }
    sumS = (sumS - str.charCodeAt(i)*Math.pow(2,substr.length-1))*2 + str.charCodeAt(i + substr.length);
}
console.log(data);