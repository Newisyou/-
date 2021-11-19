let fs = require('fs');
let arg = process.argv;
let stroka;
let podstroka;
let sumT = 0;
let sumS = 0;
data = new Array();

stroka = fs.readFileSync(arg[3]);
stroka = stroka.toString();
    
podstroka = fs.readFileSync(arg[4]);
podstroka = podstroka.toString();

//Ввод: node B&H.js brut/hash stroka.txt podstoka.txt


if (arg[2] == 'brut') {
    for (let i = 0; i <= stroka.length - podstroka.length; i++) {
        let j = 0;
        while (stroka[i + j] == podstroka[j]) {
            j++
            if (j == podstroka.length) {
                console.log(i+1);
                break;
            }
        }
    }
}

if (arg[2] == 'hash') {
    for (let i = 0; i < podstroka.length; i++){
        sumT += podstroka.charCodeAt(i)*2^(podstroka.length-i);
    }

    for (let i = 0; i < podstroka.length; i++){
        sumS += stroka.charCodeAt(i) * 2 ^ (podstroka.length - i);
    }

    for (let i = 1; i < stroka.length - podstroka.length + 2; i++){
        if (sumS === sumT) {
            let a = -1;
            let k = 0;
            for (let j = 1; j < podstroka.length + 1; j++){
                a++;
                if (podstroka[j - 1] === stroka[a + i - 1]) {
                    k++
                }
                else
                    break;
            }
            if (k === podstroka.length) {
                data.push(i);
            }
        }
        sumS = sumS - stroka.charCodeAt(i - 1) + stroka.charCodeAt(i + podstroka.length - 1);
    }
    console.log(data);
}