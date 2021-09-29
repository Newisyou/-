let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 0, l = 0;
let symb='';
let inText1;

if (arg[2] == 'code') {
    /*входные данные коммандной строки:
    node .js code/decode input.txt(откуда берем) out.txt(куда вставляем результат)
    */
    fs.readFile(arg[2], (err, data) => {//читаем из файла
        if (err) {//если ошибка, вывести ошибку и указать на место
            console.error(err);
            return;
        }
        console.log(data.toString());//выведет содержимое файла
        inText = data.toString();//присвоим переменной значение строки
        while (i < inText.length) {
            symb = symb + inText.charAt(i);//присваиваем текущий символ из начальной строки
            while (inText.charAt(i) == inText.charAt(i + n)) {
                n++;// если есть повторы считаем
            }
            l = n;
            while (l > 259) {   //если повторов больше 259 мы дробим, пока не останется остаток
                symb = symb.substring(0, symb.length - 1);
                symb = symb + '#' + String.fromCharCode(l) + inText.charAt(i);
                l -= 259;
                i += l

            }
            if (l >= 4) {
                symb = symb.substring(0, symb.length - 1);
                symb = symb + '#' + String.fromCharCode(l) + inText.charAt(i);
                i += l
            }
            else i++
            n = 1;
        }
    
        fs.writeFileSync(arg[3], symb);
    })
        
    //console.log(symb);
    
}

if (arg[2] == 'decode') {
    inText = fs.readFileSync(arg[3]);
    inText = inText.toString();
    while (i < inText.length) {
        if (inText.charAt(i) == '#') {//закодированная последовательность всегда имеет вид #[](символ, который кодируем)
            n = inText.charCodeAt(i + 1);//преобразование спецсимвола
            for (l = 0; l < n; l++) {
                symb += inText.charAt(i + 2);//добавление n-нного колличества закодированных символов
            }
            i = i + 3;//перешагиваем на следующий символ после закодированной последовательности
        }
        else {
            symb += inText.charAt(i);//если нет кодировки, просто переписываем
            i++
        }

    }
    fs.writeFileSync(arg[4], symb);
    }

