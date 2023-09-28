const isValidId = require('./isValidId');
const isValidIdBody = require('./isValidIdBody');
const auth = require('./auth');
const upload = require('./upload');
const validateBody = require('./validateBody');

module.exports = {
    isValidId,
    isValidIdBody,
    auth,
    upload,
    validateBody,
}