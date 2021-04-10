#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const htmlTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Template</title>
    </head>
    <body>
        <h1>Hello</h1>
        <p>Cli</p>
    </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('OK');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
`;

const exist = (dir) => {
    try {
        fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (e) {
        return false;
    }
}

const mkdirp = (dir) => {
    const dirname = path
        .relative('.', path.normalize(dir))
        .split(path.sep)
        .filter(p => !!p);
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder);
        }
    });
};

const makeTemplate = (type, name, directory) => {
    mkdirp(directory);
    if (type === 'html') {
        const pathToFile = path.join(directory, `${name}.html`);
        if (exist(pathToFile)) {
            console.error(chalk.bold.red('already file exist'));
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate);
            console.log(chalk.green('file created'));
        }
    } else if (type === 'express-router') {
        const pathToFile = path.join(directory, `${name}.js`);
        if (exist(pathToFile)) {
            console.error(chalk.bold.red('already file exist'));
        } else {
            fs.writeFileSync(pathToFile, routerTemplate);
            console.log(chalk.green('file created'));
        }
    } else {
        console.error(chalk.bold.red('no type'));
    }
};

program
    .version('0.0.1', '-v, --version')
    .name('cli');

program
    .command('template <type>')
    .usage('<type> --filename [filename] --directory [directory]')
    .description('create template')
    .alias('tmpl')
    .option('-f, --filename [filename]', 'filename', 'index')
    .option('-d, --directory [directory]', 'directory', '.')
    .action((type, options) => {
        makeTemplate(type, options.filename, options.directory);
    });

program
    .action((cmd, comd) => {
        if (comd.args.length) {
            console.log(chalk.bold.red('no command'));
            program.help();
        } else {
            inquirer.prompt([{
                type: 'list',
                name: 'type',
                message: 'choice template',
                choices: ['html', 'express-router'],
                }, {
                    type: 'input',
                    name: 'name',
                    message: 'input filename',
                    default: 'index',
                }, {
                    type: 'input',
                    name: 'directory',
                    message: 'input directory',
                    default: '.',
                }, {
                    type: 'confirm',
                    name: 'confirm',
                    message: 'create?',
                }])
                    .then((answer) => {
                        if (answer.confirm) {
                            makeTemplate(answer.type, answer.name, answer.directory);
                            console.log(chalk.rgb(128, 128, 128)('exit'));
                        }
                    });
        }
    })
    .parse(process.argv);