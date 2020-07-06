const express = require('express');
const RoulleteController = require('./controllers/RoulleteController');

const router = express.Router();

router.post('/roullete/', RoulleteController.insertRoullete);
router.post('/roullete/open/:id(\\d+)', RoulleteController.roulleteOpening);

module.exports = router;
