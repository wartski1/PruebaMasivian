const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const Ioredis = require('ioredis');
const redisConfig = require('../../app/config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const { KEY_BET } = process.env;
const API = '/api/roulette-game';
chai.use(chaiHttp);

describe('Bet CRUD flows', () => {
  beforeEach(async () => {
    await Helper.clearCache();
  });

  after(async () => {
    await Helper.clearCache();
  });

  it('Test to register a new bet', async () => {
    const data = { state: 'active' };
    await Redis.rpush(KEY_BET, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/bet/0`)
      .send({ value: '1', amount: 25 })
      .then((res) => {
        const { status } = res;
        assert.equal(200, status);
    });
  });

  it('Test where the roulette is not registered and try to bet.', () => chai
    .request(app)
    .post(`${API}/bet/0`)
    .send({ value: '1', amount: 25 })
    .then(assert.fail)
    .catch((err) => {
      const { status } = err;
      assert.equal(404, status);
    }));

  it('Test where a bet is made with a closed roulette', async () => {
    const data = { state: 'closed' };
    await Redis.rpush(KEY_BET, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/bet/0`)
      .send({ value: '1', amount: 25 })
      .then(assert.fail)
      .catch((err) => {
        const { status } = err;
        assert.equal(400, status);
      });
  });

  it('Test where a bet is placed with an incorrect value', async () => {
    const data = { state: 'active' };
    await Redis.rpush(KEY_BET, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/bet/0`)
      .send({ value: 'negrita', amount: 25 })
      .then(assert.fail)
      .catch((err) => {
        const { status } = err;
        assert.equal(400, status);
      });
  });

  it('Test where a bet is placed with an incorrect amount', async () => {
    const data = { state: 'active' };
    await Redis.rpush(KEY_BET, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/bet/0`)
      .send({ value: 'negro', amount: 25000 })
      .then(assert.fail)
      .catch((err) => {
        const { status } = err;
        assert.equal(400, status);
      });
  });  
});
