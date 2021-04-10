#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('thank you');
        rl.close();
    } else if (answer === 'n') {
        console.log('sorry');
        rl.close();
    } else {
        console.clear();
        console.log('error');
        rl.question('예제가 재미있습니까?', answerCallback);
    }
}

rl.question('예제가 재미있습니까?', answerCallback);