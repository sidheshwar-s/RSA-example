const { logger } = require('../services/logger');
const config  = require('../../config');
const { decrypt } = require('../utils');

const saveInfo = async (req, res) => {
    try {
        logger.info('saving Info route is called');
        const {
            name,
            address,
            creditCardNo,
            cvv,
            expiryDate,
        } = req.body;

        decryptedCreditCardNo = decrypt(creditCardNo);
        decryptedCvv = decrypt(cvv);
        decryptedExpirtyDate = decrypt(expiryDate);

    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    saveInfo
}