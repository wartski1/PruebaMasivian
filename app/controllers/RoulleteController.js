const RoulleteController = module.exports;
const RoulleteService = require('../services/RoulleteService');

RoulleteController.insertRoullete = (req, res, next) => RoulleteService.insertRoullete()
  .then(response => res.send(response))
  .catch(error => next(error));
