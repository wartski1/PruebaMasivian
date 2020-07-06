const BetRepostory = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const { KEY_BET } = process.env;

function getKey(key) {
  return `${KEY_BET}:${key}`;
};

BetRepostory.insertBet = (key, data) =>
  Redis.rpush(getKey(key), JSON.stringify(data));

BetRepostory.getBets = (key) =>
  Redis.lrange(getKey(key), 0, -1);

BetRepostory.deleteBetList = (key) =>
  Redis.del(getKey(key));
