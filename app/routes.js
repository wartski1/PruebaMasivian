const express = require('express');
const RoulleteController = require('./controllers/RoulleteController');

const router = express.Router();

router.post('/roullete/', RoulleteController.insertRoullete);

module.exports = router;
