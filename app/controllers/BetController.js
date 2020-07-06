const BetController = module.exports;
const BetService = require('../services/BetService');
const BetInsertSchema = require('../models/requests/BetInsertSchema');
const Validator = require('../utils/Validator');

BetController.insertBet = (req, res, next) => {
  const authorization = req.header('Authorization');
  const { params: { idRoullete } } = req;
  const { body } = req;
  Validator(BetInsertSchema).validateRequest(body);

  return BetService.roulleteOpening(authorization, idRoullete, body)
    .then(response => res.send(response))
    .catch(error => next(error));
};
