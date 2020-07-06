const RoulleteService = module.exports;
const RoulleteRepository = require('../repositories/RoulleteRepository');
const { NotFoundError, BadRequestError } = require('../utils/ErrorHandlerMiddleware');

RoulleteService.insertRoullete = async () => {
  const data = { state: 'closed' };
  const numberOfRoullete = await RoulleteRepository.insertRoullete(data);
  const idRoullete = { id: numberOfRoullete - 1 };

  return idRoullete;
};

RoulleteService.roulleteOpening = async (id) => {
  const roullete = JSON.parse(await RoulleteRepository.getRoullete(id));
  if (!roullete) throw new NotFoundError('The roulette you are trying to activate is not registered.');
  const { state } = roullete;
  if (state !== "closed") throw new BadRequestError('The roulette you are trying to activate is already activated.');
  const data = { state: 'active' };
  RoulleteRepository.updateRoullete(id, data);

  return { message: 'OK' };
};
