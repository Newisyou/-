let arg = process.argv;

let string;
let substring;

string = arg[2];
substring = arg[3];

strlength = string.length;
sublength = substring.length;
alph = new Array();
alphabet = new Array();

//Определяем алфавит строки substring
for (i = 0; i <sublength ; i++){
    alph[substring.charAt(i)] = 0;
    alphabet[i] = substring.charAt(i);
}

//В двумерном массиве del храним таблицу переходов
del = new Array(sublength + 1)
for (j = 0; j <= sublength; j++){
    del[j] = new Array();
}

//Инициализируем таблицу переходов
for (i in alph){
    del[0][i] = 0;
}

//Формируем таблицу переходов
for (j = 0; j < sublength; j++){
    prev = del[j][substring.charAt(j)]
    del[j][substring.charAt(j)] = j+1
    for(i in alph){
        del[j+1][i] = del[prev][i]
    }
}

//Выводим таблицу переходов
console.log('Таблица переходов:');
for (j = 0; j <= sublength; j++) {
    out = '';
    for (i in alph){
        out += del[j][i] + ' ';
    }
    console.log(j, out);
}

//console.log(del[1][string.charAt(3)]);

state = 0;
result = new Array();
for (let i = 0; i < strlength; i++){
    if (alphabet.indexOf(string.charAt(i)) != -1){
        state = del[state][string.charAt(i)];
        if (state == sublength){
            result.push(i - sublength + 1); 
        }
    }
    else state = 0;
}

console.log('result:', result);
