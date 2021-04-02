// const exec = require('child_process').exec;

// const process = exec('dir');
// process.stdout.on('data', function(data) {
//     console.log(data.toString());
// });

// process.stderr.on('data', function(data) {
//     console.error(data.toString());
// });

const spawn = require('child_process').spawn;

const process = spawn('python', ['hello.py']);

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) {
    console.error(data.toString());
});