 //node float.js translater/calc input.txt output.txt



function float(num, count, order, mantissa) {
    this.num = num;
    this.count = count;
    this.order = order;
    this.mantissa = mantissa;
}

function isNumeric(num){
    num = "" + num; //coerce num to be a string
    return !isNaN(num) && !isNaN(parseFloat(num));
}

function signOut(str) {
    if (str[0]=="-") {
        return true;
    }
    else {
        return false    
    }
}
    
function convertation(number, mass) {

    let n = new float(number, 0, "", "");
    mass.push(n);
    convert = (number).toString(2);

    if (convert.indexOf('.') == -1){
        convert += '.';
    }

    mass[0].count = convert.indexOf('.') - convert.indexOf('1') - 1;

    if (mass[0].count >= 0){
        convert = convert.slice(convert.indexOf('1'), convert.indexOf('.')) + convert.slice(convert.indexOf('.') + 1);
    }
    else {
        mass[0].count++;
        convert = convert.slice(convert.indexOf('1'));
    }

    if (convert.length > 24){
        convert = convert.slice(0, 24);
    }
    else {
        convert += '0'.repeat(24 - convert.length);
    }
    
    mass[0].mantissa = convert.slice(1);
    
    mass[0].order = (mass[0].count + 127).toString(2);
    mass[0].order = '0'.repeat(8 - mass[0].order.length) + mass[0].order;
        
    output = output + " " + mass[0].order + " " + mass[0].mantissa;
}

function main(str, mass) {
    if (isNumeric(str))
    {
        if (signOut(str)){
            output = '1';
            str = str.substr(1);
        }
        number = parseFloat(str);


        if (number> (2 - Math.pow(2, -23)) * Math.pow(2, 127)) {
            output = output +" "+ "11111111"+" "+"000000000000000000000000";
        }
        else if (number < Math.pow(2, -126) || number == 0) 
            {
                output = "0" +" "+ "0000000" +" "+ "0".repeat(23);
            }
        else {
            convertation(number, mass);
        }    
    }
    else
        output = "0" + " " + '1'.repeat(9) + " " + '0'.repeat(23);
}

function def_of_sum(inputData, mass1, mass2, mass3) {
    let sign;
    let sum1="";
    let sum2="";
    let i = 0;

    if (inputData.includes("+")) {
        m = inputData.indexOf("+");
        for (; i < m; i++) {
            sum1 += inputData[i];
        }
        i = m + 1
        for (; i < inputData.length; i++) {
            sum2 += inputData[i];
        }
        b = 1;
    }
    else {
        b = 0;
        m = inputData.indexOf("-");
    for (; i < inputData.lastIndexOf('-'); i++) {
        sum1 += inputData[i];
    }
    for (i; i < inputData.length; i++) {
        sum2 += inputData[i];
    }
    }

    let n = new float(0, 0, "", "");
    mass3.push(n);

    num1 = parseFloat(sum1);
    num2 = parseFloat(sum2);

    if (Math.abs(num1) > Math.abs(num2)) {
        sign = sum1;
    }
    else sign = sum2;

    convertation(num1, mass1);
    convertation(num2, mass2);

    output = '0';

    if (signOut(sign)) {
        output = '1';
        sign = sign.substr(1);
    }

    mass1[0].mantissa = "1" + mass1[0].mantissa;
    mass2[0].mantissa = "1" + mass2[0].mantissa;

    if (mass1[0].count != mass2[0].count) {
        dif = Math.abs(mass1[0].count - mass2[0].count);      
        if (mass1[0].count > mass2[0].count) {
            mass2[0].count = mass1[0].count;
            mass2[0].order = mass1[0].order;
            mass2[0].mantissa = '0'.repeat(dif) + mass2[0].mantissa
            mass2[0].mantissa = mass2[0].mantissa.slice(0, 24);
        }
        else if (mass2[0].count > mass1[0].count) {
            mass1[0].count = mass2[0].count;
            mass1[0].order = mass2[0].order;
            mass1[0].mantissa = '0'.repeat(dif) + mass1[0].mantissa
            mass1[0].mantissa = mass1[0].mantissa.slice(0, 24);
            
        }
    }

}

function sum(mass1, mass2, mass3) {
    let numSum1;
    let numSum2;
    let numSun3;

    if (mass1[0].order == mass2[0].order) {
        mass1[0].mantissa = parseInt(mass1[0].mantissa, 2).toString(10);
        mass2[0].mantissa = parseInt(mass2[0].mantissa, 2).toString(10);
        numSum1 = Number(mass1[0].mantissa);
        numSum2 = Number(mass2[0].mantissa);
        numSun3 = numSum1 + numSum2;
        mass3[0].mantissa = (numSun3).toString(2);

        if (mass3[0].mantissa.length > 24) {
            i = mass3[0].mantissa.length - 24;
            mass3[0].order = parseInt(mass1[0].order, 2).toString(10);
            numorder1 = Number(mass3[0].order) + 1;
            mass3[0].order = (numorder1).toString(2);
            mass3[0].mantissa = mass3[0].mantissa.substr(i);
        }
        else
        {
            mass3[0].mantissa = mass3[0].mantissa.substr(1);
            mass3[0].order = mass1[0].order;
        }
        c1 = parseInt(mass3[0].order, 2).toString(10);
        count = Number(c1) - 127;
        mass3[0].count = count;  
        output = output + " " + mass3[0].order + " " + mass3[0].mantissa;   
    }
}

function subtract(mass1, mass2, mass3) {
    let numSum1;
    let numSum2;
    let numSun3;

    if (mass1[0].order == mass2[0].order) {
        mass1[0].mantissa = parseInt(mass1[0].mantissa, 2).toString(10);
        mass2[0].mantissa = parseInt(mass2[0].mantissa, 2).toString(10);
        numSum1 = Number(mass1[0].mantissa);
        numSum2 = Number(mass2[0].mantissa);
        numSun3 = numSum1 - numSum2;
        mass3[0].mantissa = (numSun3).toString(2);   
        if (mass3[0].mantissa.length < 24) {
            i = 24 - mass3[0].mantissa.length;
            mass3[0].order = parseInt(mass1[0].order, 2).toString(10);
            numorder1 = Number(mass3[0].order) - i;
            mass3[0].order = (numorder1).toString(2)           
            mass3[0].mantissa = mass3[0].mantissa + '0'.repeat(i);
            mass3[0].mantissa = mass3[0].mantissa.substr(1);
            
        }
        else
        {
            mass3[0].mantissa = mass3[0].mantissa.substr(1);
            mass3[0].order = mass1[0].order;
        }
        while (mass3[0].order.length < 8) {
            mass3[0].order='0'+mass3[0].order
        }
        c1 = parseInt(mass3[0].order, 2).toString(10);
        count = Number(c1) - 127;
        mass3[0].count = count;
        output = output + " " + mass3[0].order + " " + mass3[0].mantissa;
           
    }
}

function back_conversate(output, mass3) {
    if (mass3[0].mantissa.length == 24){
        mass3[0].mantissa = mass3[0].mantissa.substring(0, mass3[0].mantissa.length - 1);
    }
    let numOut = '';
    let degree = Math.pow(2,parseInt(mass3[0].order,2)-127);
    let mantissa = Number(parseInt('1'+mass3[0].mantissa,2)/Math.pow(2,23));
    let r = ((degree * mantissa).toFixed(2)).toString();
    if (output[0] == 1) {
        numOut = '-';
    }
    
    numOut='~'+ numOut+r;
    return (numOut);
 
}










let fs = require('fs');
let arg = process.argv;
let inputData;//для ввода из файла
let output='0';
inputData = fs.readFileSync(arg[3]);//читаем из файла
inputData = inputData.toString();
let massive = new Array();




if (arg[2] == 'translater') {
    main(inputData, massive);
    fs.writeFileSync(arg[4], output);
}


if (arg[2] == 'calc') {
    let mass1 = new Array();
    let mass2 = new Array();
    let mass3 = new Array();
    let numOut = '';;

    def_of_sum(inputData, mass1, mass2, mass3);
    //console.log(mass1);
    //console.log(mass2);



    if (b == 1) {
        
        if (mass1[0].num <0 && Math.abs(mass1[0].num) > Math.abs(mass2[0].num)) {
            subtract(mass1, mass2, mass3);
        }
        if (mass1[0].num <0 && Math.abs(mass1[0].num) < Math.abs(mass2[0].num)) {
            subtract(mass2, mass1, mass3);
        }

        if (mass1[0].num>0 && (mass1[0].num >= mass2[0].num || mass2[0].num >= mass1[0].num)) {
            sum(mass1, mass2, mass3);
        }
        
    }
   
    if (b == 0) {
        if (mass1[0].num < 0){
            sum(mass1, mass2, mass3);
        }         
        if (mass1[0].num > 0 && Math.abs(mass1[0].num) > Math.abs(mass2[0].num)) {
            subtract(mass1, mass2, mass3);
        }
        if (mass1[0].num > 0 && Math.abs(mass1[0].num) == Math.abs(mass2[0].num)) {
            output = "0" + " " + '0'.repeat(9) + " " + '0'.repeat(23);
        }
        
        if (mass1[0].num > 0 && Math.abs(mass1[0].num) < Math.abs(mass2[0].num)) {
            subtract(mass2, mass1, mass3);
        }
    }

    numOut=back_conversate(output, mass3);
    output = output + ' '.repeat(5) + numOut;
    fs.writeFileSync(arg[4], output);
}
