const BetService = module.exports;
const RoulleteRepository = require('../repositories/RoulleteRepository');
const { BadRequestError, NotFoundError } = require('../utils/ErrorHandlerMiddleware');
const BetRepository = require('../repositories/BetRepository');

BetService.roulleteOpening = async (authorization, idRoullete, body) => {  
  const roullete = JSON.parse(await RoulleteRepository.getRoullete(idRoullete));
  const { value, amount } = body;  
  if (!roullete) throw new NotFoundError('The roulette you are trying to bet on is not registered.');
  const { state } = roullete; 
  if (state === "closed") throw new BadRequestError('The roulette you are trying to bet on is not active.');  
  const validValue = validateBetValue(value);
  if (!validValue) throw new BadRequestError('The value you want to bet on is incorrect.');
  if (amount < 1 || amount > 10000) throw new BadRequestError('The amount you want to bet is incorrect.');
  const data = {
    idClient: authorization,
    idRoullete: idRoullete,
    betValue: value,
    betAmount: amount,  
  };
  await BetRepository.insertBet(idRoullete, data);

  return { message: 'OK' };  
};

function validateBetValue(value) {   
  if (value !== 'negro' && value !== 'rojo') {
    if (parseInt(value) >= 0 && parseInt(value) <= 36) {

      return true;
    }
  }
  if (value === 'negro' || value === 'rojo') {

    return true;
  }

  return false;
};
