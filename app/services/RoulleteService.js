const RoulleteService = module.exports;
const RoulleteRepository = require('../repositories/RoulleteRepository');

RoulleteService.insertRoullete = async () => {
  const data = { state: 'closed' };
  const numberOfRoullete = await RoulleteRepository.insertRoullete(data);
  const idRoullete = { id: numberOfRoullete - 1 };

  return idRoullete;
};
