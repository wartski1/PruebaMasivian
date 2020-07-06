const RoulleteController = module.exports;
const RoulleteService = require('../services/RoulleteService');

RoulleteController.insertRoullete = (req, res, next) => RoulleteService.insertRoullete()
  .then(response => res.send(response))
  .catch(error => next(error));

RoulleteController.roulleteOpening = (req, res, next) => {
  const { params: { id } } = req;

  return RoulleteService.roulleteOpening(id)
    .then(response => res.send(response))
    .catch(error => next(error));
};
