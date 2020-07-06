const RoulleteService = module.exports;
const RoulleteRepository = require('../repositories/RoulleteRepository');
const BetRepository = require('../repositories/BetRepository');
const { NotFoundError, BadRequestError } = require('../utils/ErrorHandlerMiddleware');
const Promise = require('bluebird');

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

RoulleteService.roulleteClosure = async (id) => {
  const roullete = JSON.parse(await RoulleteRepository.getRoullete(id));
  if (!roullete) throw new NotFoundError('The roulette you are trying to close is not registered.');
  const { state } = roullete;
  if (state === "closed") throw new BadRequestError('The roulette you are trying to close is already closed.');
  const data = { state: 'closed' };
  await RoulleteRepository.updateRoullete(id, data);
  const bets = await BetRepository.getBets(id);
  const betList = await Promise.mapSeries(bets, (bet) => {

    return JSON.parse(bet);
  });
  await BetRepository.deleteBetList(id);

  return betList;
};

RoulleteService.getRoullets = async () => {
  const roullets = await RoulleteRepository.getRoullets();
  let index = 0;
  const roulleteList = await Promise.mapSeries(roullets, (roullete) => {
    const roulleteJson = JSON.parse(roullete);

    return { id: index++, ...roulleteJson };
  });

  return roulleteList;
}
