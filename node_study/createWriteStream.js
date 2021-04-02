const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
    console.log('done');
});

writeStream.write('이 글을 씁니다\n');
writeStream.write('이 글을 씁니다\n');
writeStream.end();