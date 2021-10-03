let fs = require('fs');//переменная fs объект для работы с файловой системой
let arg = process.argv;//переменная для работы с аргументами коммандной строки
let inputData;//для ввода из файла
let i = 0;//счетчик длины строки
let entropy = 0;//переменная для подсчета энтропии
let alph = new Array();//объект типа "массив"
let length = 0;//количество неповторяющихся символов в строке

inputData = fs.readFileSync(arg[2]);//читаем из файла
inputData = inputData.toString();

for (i = 0; i < inputData.length;i++){
    if (alph[inputData.charAt(i)] == undefined) {//если элемент ранеее не был идентифицирован присваиваем ему значение 1
        alph[inputData.charAt(i)] = 1;
        length++;//считаем длину алфавита(нет повторяющихся символов)
    }
    else alph[inputData.charAt(i)]++;//если элемент уже есть в массиве, считаем сколько раз он встретится
}

if (length > 1)
{
    for (let le in alph){//счетчик внутри массива
        let m = alph[le] / inputData.length;//промежуточная переменная, для подсчета того, как часто встречается символ
        entropy += (m * (Math.log(m) / Math.log(length)));
    }
    entropy = Math.abs(entropy);//энтропия - количество, у нее нет направления, потому берем модуль
}
console.log('entropy = ', entropy);
console.log(alph);
console.log('length =',length);