const {Router} = require('express');
const {textData} = require('../controllers/words.js')
const router = Router();

router.get('/', textData);

module.exports = router;