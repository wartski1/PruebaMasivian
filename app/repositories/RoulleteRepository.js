const RoulleteRepository = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const { KEY_ROULLETE } = process.env;

RoulleteRepository.insertRoullete = (data) =>
  Redis.rpush(KEY_ROULLETE, data);
