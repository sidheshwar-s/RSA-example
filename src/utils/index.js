const fs = require('fs');
const { logger } = require('../services/logger');
const config = require('../../config');
var bigInt = require("big-integer");

var gcd = function(a, b) {
    if (!b) {
      return a;
    }
  
    return gcd(b, a % b);
}
function lcm(a, b) {
    return (a * b) / gcd(a, b); 
}

function gcdExtended(a, b){
    if (a == 0) {
        x = 0;
        y = 1;
        return b;
    }
      
    let g = gcdExtended(b % a, a);
    let x1 = x;
    let y1 = y;
 
    x = y1 - Math.floor(b / a) * x1;
    y = x1;
  
    return g;
}

// Extended euclidean algorithm
function modInverse(a, m)
{
    let g = gcdExtended(a, m);
    if (g != 1){
        console.log("Inverse doesn't exist");
        return -1
    }
    else {
        let res = (x % m + m) % m;
        console.log("Modular multiplicative inverse is ", res);
        return res;
    }
}

const decrypt = (cipherText) => {
    // message = (c ^ d) mod n
    const privateKey = config.get('privatekey');
    const d = bigInt(privateKey['d']);
    const n = bigInt(privateKey['n']);
    console.log(d.toString(), n.toString())
    const temp = bigInt(cipherText).pow(d);
    const decryptedMessage = temp.mod(n);
    return decryptedMessage;
}

const encrypt = (plainText) => {
    // c = (m ^ e) mod n
    let ascii_val = plainText
    const publicKey = config.get('publickey');
    console.log(`Plain text in ascii = ${ascii_val}`);
    const cipherText = Math.pow(ascii_val, publicKey['e']) % publicKey['n'];
    console.log(`Cipher text of ${plainText} => ${cipherText}`);
    return cipherText;
}

const generateKeys = async () => {
    const p = 787;
    const q = 383;
    const n_val = p * q;
    const e_val = 11;
    const lambda_n = lcm(p - 1, q - 1); 
    const d_val = modInverse(e_val, lambda_n);
    const data = {
        publickey: {
            e: e_val,
            n: n_val,
        }, privatekey: {
            d: d_val,
            n: n_val,
        }
        
    };
    var json = JSON.stringify(data);
    fs.writeFile('config/development.json', json, 'utf8', (err) => {
        logger.error('error: ' + err);
    });
}

module.exports = {
    decrypt,
    generateKeys,
    encrypt
};