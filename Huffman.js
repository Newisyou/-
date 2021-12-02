function Node(letter, freq, used, father, code) {
    this.letter = letter;//буква
    this.freq = freq;//частота
    this.used = used;//был ли использован
    this.father = father;//откуда идет ветвление (кто отец)
    this.code = code;//код ветви(0 или 1) 
}

let alph = new Array();
let tree = new Array();
let fs = require('fs');//переменная fs объект для работы с файловой системой
let arg = process.argv;//переменная для работы с аргументами коммандной строки
let inputData;
let i = 0;
let alphLength = 0;
let treeLenght = 0;
let cod = {};


inputData = fs.readFileSync(arg[2]);//читаем из файла
inputData = inputData.toString();

for (i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] = 0;
}

for (i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)]++;

}

console.log('string:', inputData);

//Обработка случая, когда в строке встречается только один символ
let count = 0;
for (i in alph){
    count++;
}
if (count == 1) {
    for (i in alph) {
        alph[i] = '0';
        cod['0'] = i;
    }
}

else {
    for (i in alph) {//заполняем массив tree 
        let n = new Node(i, alph[i], false, null, '');
        tree.push(n);
        alphLength++;//считаем мощность алфавита
        treeLenght++;
    }

//console.log(alphLength);

for (let i = 0; i < alphLength-1; i++){//перебираем массив tree, с нулевого по n-1 элемент
    let freq1 = inputData.length;//для подсчета наименьшей частоты
    let min = 0;
    for (let i = 0; i < tree.length - 1; i++) {//найдем первый минимальный элемент
        if ((tree[i].freq <= freq1) && (tree[i].used == false)) {
            freq1 = tree[i].freq;//сравниваем частоту, если у элемента меньше, freq1 принимает его значение
            min = i;//min принимает значение порядкового номера элемента
        }
    }
    tree[min].used = true; /*мы использовали элемент, меняем значение соответсвующего параметра,
     чтобы в дальнейшем не возвращаться к элементу*/
    tree[min].code = 1;
    tree[min].father = tree.length;//записываем код родителя
    
    let freq2 = inputData.length;
    let min1 = 0;
    for (let i = 0; i < tree.length; i++) {//находим второй минимальный элемент
        if ((tree[i].freq < freq2) && (tree[i].used == false)) {
            freq2 = tree[i].freq;
            min1 = i;
        }
    }
    tree[min1].used = true;
    tree[min1].code = 0;
    tree[min1].father = tree.length;
    let n = new Node(tree[min].letter + tree[min1].letter, tree[min].freq + tree[min1].freq, false, null, '');
    tree.push(n);
    //создаем родительский узел
    treeLenght++;
}
//console.log(tree);


for (i in alph){
    let codeOfSymb = '';
    let j = 0;
    
    while (i != tree[j].letter){
        j += 1;
    }
    
    do {
        codeOfSymb = tree[j].code + codeOfSymb;
        j = tree[j].father;
    } while ((tree[j].father != null))

    cod[codeOfSymb] = i;
    alph[i] = codeOfSymb;
    console.log(i, codeOfSymb);
 
}
}


let out = inputData;
//выводим получившуюся закодированную последовательность
for (i in alph) {
    out = out.replace(RegExp(i, 'g'), alph[i])
    }
console.log('code', out);

//decode
let output = '';
let str = '';
for (i in out){
    str += out[i];
    if (cod[str] != undefined) {
        output += cod[str];
        str = '';
    }
    
}
console.log('decode', output);
