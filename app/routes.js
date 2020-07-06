const express = require('express');
const RoulleteController = require('./controllers/RoulleteController');
const BetController = require('./controllers/BetController');

const router = express.Router();

router.post('/roullete/', RoulleteController.insertRoullete);
router.post('/roullete/open/:idRoullete(\\d+)', RoulleteController.roulleteOpening);
router.post('/bet/:idRoullete(\\d+)', BetController.insertBet);
router.post('/bet/close/:idRoullete(\\d+)', RoulleteController.roulleteClosure);
router.get('/roullete/', RoulleteController.getRoullets);

module.exports = router;
