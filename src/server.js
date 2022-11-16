/** load dependencies */
const express = require('express');
const cors = require('cors');
const config = require('../config');
const { logger } = require('./services/logger');

const { decrypt, generateKeys, encrypt } = require('./utils');

/** declare application and load middleware */
const app = express();
app.use(cors());

/** use json parser and body parser */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** show alive status on server root */
app.get('/', (req, res) => {
    try {
        res.status(200).send({ message: 'Server is live !!', alive: true });
    } catch (error) {
        res.status(400).send({
            message: 'Server is not live !!',
            alive: false,
        });
    }
});

app.get('/generate', async (req, res) => {
    try {
        logger.info('generate key route called');
        await generateKeys();
        res.send({message: "Key generation successfull"});
    } catch (err) {
        logger.error('error in generating private key, error: ' + err);
        res.status(422).send({mesasge: "Sorry something went wrong", error: err});
    }
});

app.post('/encrypt', (req, res) => {
    try {
        const msg = req.body.message;
        logger.info('encrypting plain text: ' + msg);
        const cipher = encrypt(msg);
        res.send({"cipher-text": cipher});
    } catch (err) {
        logger.error('encryption failed error: ' + err);
        res.status(422).send({mesasge: "Sorry something went wrong", error: err});
    }
});

app.post('/decrypt', (req, res) => {
    try {
        const cipher = req.body.message;
        logger.info('decrypting cipher text: ' + cipher);
        const plainText = decrypt(cipher);
        res.send({"decrypted-message": plainText});
    } catch (err) {
        logger.error('decryption failed error: ' + err);
        res.status(422).send({mesasge: "Sorry something went wrong", error: err});
    }
});

/** Start server */
const PORT = config.get('port');
app.listen(PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
});
