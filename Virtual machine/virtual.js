//npm install readline-sync
const fs = require('fs');
const readsync = require('readline-sync');
let memory = new Array();
let arg = process.argv


let progtext = fs.readFileSync(arg[2]);
progtext = progtext.toString();
memory = progtext.split(/\s+/);

let ip = 0;
let flag = true;
while (flag)
    switch (memory[ip]) {
        case 'input':
            let value = readsync.question('Enter: ');
            memory[memory[ip + 1]] = parseFloat(value);
            ip += 2
            break;
        case 'output':
            console.log('result: ',memory[memory[ip + 1]]);
            ip += 2;
            break;
        case 'set':
            memory[memory[ip + 1]] = parseFloat(memory[ip + 2]);
            ip += 3;
            break;
        case 'add':
            memory[memory[ip + 3]] = memory[memory[ip + 1]] + memory[memory[ip + 2]];
            ip += 4;
            break;
        case 'sub':
            memory[memory[ip + 3]] = memory[memory[ip + 1]] - memory[memory[ip + 2]];
            ip += 4;
            break;
        case 'mul':
            memory[memory[ip + 3]] = memory[memory[ip + 1]] * memory[memory[ip + 2]];
            ip += 4;
            break;
        case 'cmp':
            if (memory[memory[ip + 1]] == memory[memory[ip + 2]])
                memory[memory[ip + 3]] = 0;
            else
                memory[memory[ip + 3]] = 1;
            ip += 4;
            break;
        case 'lti':
            if (memory[memory[ip + 1]] < memory[memory[ip + 2]])
                memory[memory[ip + 3]] = 0;
            else
                memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
        case 'leti':
            if (memory[memory[ip + 1]] <= memory[memory[ip + 2]])
                memory[memory[ip + 3]] = 0;
            else
                memory[memory[ip + 3]] = 1;
            ip += 4;
            break;
        case 'mti':
            if (memory[memory[ip + 1]] > memory[memory[ip + 2]])
                memory[memory[ip + 3]] = 0;
            else
                memory[memory[ip + 3]] = 1;
            ip += 4;
            break;
        case 'meti':
            if (memory[memory[ip + 1]] >= memory[memory[ip + 2]])
                memory[memory[ip + 3]] = 0;
            else
                memory[memory[ip + 3]] = 1;
            ip += 4;
            break;
        case 'jmp':
            ip = parseFloat(memory[ip + 1]);
            break;
        case 'jz':
            if (memory[memory[ip + 1]] == 0)
                ip = parseFloat(memory[ip + 2]);
            else
                ip += 3;
            break;
        case 'jnz':
            if (memory[memory[ip + 1]] != 0)
                ip = parseFloat(memory[ip + 2]);
            else
                ip += 3;
            break;
        case 'exit':
            flag = false;
            break;
        }

/*
for (let i = 0; i < memory.length;i++)
    console.log(i, memory[i]);*/