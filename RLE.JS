let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, number = 0, lnumber = 0;
let symb='';
let inText1;

if (arg[2] == 'code') {
    /*входные данные коммандной строки:
    node .js code/decode input.txt(откуда берем) out.txt(куда вставляем результат)
    */
    fs.readFile(arg[3], (err, data) => {//читаем из файла
        if (err) {//если ошибка, вывести ошибку и указать на место
            console.error(err);
            return;
        }
        console.log(data.toString());//выведет содержимое файла
        inText = data.toString();//присвоим переменной значение строки
        while (i < inText.length) {
            symb = symb + inText.charAt(i);//присваиваем текущий символ из начальной строки
            while (inText.charAt(i) == inText.charAt(i + number)) {
                number++;// если есть повторы считаем
            }

            lnumber = number;
            if (inText.charAt(i) == '#') {
                symb = symb.substring(0, symb.length - 1);
                while (lnumber > 255) {   //если повторов больше 255 мы дробим, пока не останется остаток
                    symb = symb + '#' + String.fromCharCode(255) + inText.charAt(i);
                    lnumber -= 255;
                }

                symb += '#' + String.fromCharCode(lnumber) + inText.charAt(i)
            }
            else {
                if (number >= 4) {
                    while (lnumber > 255) {   //если повторов больше 255 мы дробим, пока не останется остаток
                        symb = symb.substring(0, symb.length - 1);
                        symb = symb + '#' + String.fromCharCode(255) + inText.charAt(i);
                        lnumber -= 255;
                    }

                    symb = symb + '#' + String.fromCharCode(lnumber) + inText.charAt(i);
                }
            }
                i += number;
                number = 1;

        }
    
        fs.writeFileSync(arg[4], symb);
    })
    
}

if (arg[2] == 'decode') {
    inText = fs.readFileSync(arg[3]);
    inText = inText.toString();
    while (i < inText.length) {
        if (inText.charAt(i) == '#') {//закодированная последовательность всегда имеет вид #[](символ, который кодируем)
            number = inText.charCodeAt(i + 1);//преобразование спецсимвола
            for (lnumber = 0; lnumber < number; lnumber++) {
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