const RoulleteController = module.exports;
const RoulleteService = require('../services/RoulleteService');

RoulleteController.insertRoullete = (req, res, next) => RoulleteService.insertRoullete()
  .then(response => res.send(response))
  .catch(error => next(error));

RoulleteController.roulleteOpening = (req, res, next) => {
  const { params: { idRoullete } } = req;

  return RoulleteService.roulleteOpening(idRoullete)
    .then(response => res.send(response))
    .catch(error => next(error));
};

RoulleteController.roulleteClosure = (req, res, next) => {
  const { params: { idRoullete } } = req;

  return RoulleteService.roulleteClosure(idRoullete)
    .then(response => res.send(response))
    .catch(error => next(error));
};

RoulleteController.getRoullets = (req, res, next) => RoulleteService.getRoullets()
  .then(response => res.send(response))
  .catch(error => next(error));
