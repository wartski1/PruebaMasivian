const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  REDIS_CACHE_TIME,
} = process.env;

module.exports = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASS,
  expirationTime: REDIS_CACHE_TIME,
};
