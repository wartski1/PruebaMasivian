const RoulleteRepository = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const { KEY_ROULLETE } = process.env;

RoulleteRepository.insertRoullete = (data) =>
  Redis.rpush(KEY_ROULLETE, JSON.stringify(data));

RoulleteRepository.getRoullete = (index) =>
  Redis.lindex(KEY_ROULLETE, index);

RoulleteRepository.updateRoullete = (index, data) =>
  Redis.lset(KEY_ROULLETE, index, JSON.stringify(data));
