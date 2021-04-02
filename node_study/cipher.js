const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'asdfghjklzxcvbnmqwertyuiop123456';
const iv = 'asdfghjklzxcvbnm';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화 문장', 'utf8', 'base64');
result += cipher.final('base64');

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('암호화: ', result);
console.log('복호화: ', result2);