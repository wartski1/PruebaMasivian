const Helpers = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../app/config/RedisConfig');

Helpers.clearCache = () => {
  const Redis = new Ioredis(redisConfig);

  return Redis.flushdb();
};
