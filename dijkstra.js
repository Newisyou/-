let arg = process.argv;
let fs = require('fs');
let expression = fs.readFileSync(arg[2]);
expression = expression.toString();
let output = new Array();
let stack = new Array();
let priorities = new Array();
priorities['+'] = 0;
priorities['-'] = 0;
priorities['*'] = 1;
priorities['/'] = 1;
priorities['^'] = 2; 
let count = 0;
let number = '';

    for (let i = 0; i < expression.length; i++) {
        if (isNaN(expression[i])) {
            if (expression[i] == '(') {
                if (expression[i+1]=="-"){
                    count++;
                    i++;
                    continue;
                }
            stack.push('(');
            continue;
            }

            if (expression[i] == ')') {
                if (count==1){
                    continue;
                    }
                while (stack[stack.length - 1] != '(')
                    output.push(stack.pop());
                stack.pop();
                continue;
            }

            if (priorities[expression[i]] == 2) {
                stack.push('^');
                continue;
            }

            while (stack.length > 0 && priorities[stack[stack.length - 1]] >= priorities[expression[i]])
                output.push(stack.pop());
            stack.push(expression[i]);
        }
        else {
            number+=expression[i];
        if (isNaN(expression[i+1])){
            if (count==1){
                output.push(Number(number)*(-1));
                count=0;
                i++;
            }
            else{
                output.push(Number(number));
            }
            number="";
        }
        }
}
    while (stack.length > 0)
        output.push(stack.pop());

console.log(output);