const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');
const Ioredis = require('ioredis');
const redisConfig = require('../../app/config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const { KEY_ROULLETE, KEY_BET } = process.env;
const API = '/api/roulette-game';
chai.use(chaiHttp);

describe('Roullete CRUD flows', () => {
  beforeEach(async () => {
    await Helper.clearCache();
  });

  after(async () => {
    await Helper.clearCache();
  });

  it('Test to register a new roulette', () => chai
    .request(app)
    .post(`${API}/roullete/`)
    .send({})
    .then((res) => {
      const { status } = res;
      assert.equal(200, status);
    }));

  it('Test for the correct activation of the roulette.', async () => {
    const data = { state: 'closed' };
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/roullete/open/0`)
      .send({})
      .then((res) => {
        const { status, body: { message } } = res;
        assert.equal(status, 200);
        assert.equal(message, 'OK');
      });
  });

  it('Test where the roulette is not registered and try to activate.', () => chai
    .request(app)
    .post(`${API}/roullete/open/0`)
    .send({})
    .then(assert.fail)
    .catch((err) => {
      const { status } = err;
      assert.equal(404, status);
    }));

  it('test where a roulette that is already activated is trying to activate', async () => {
    const data = { state: 'active' };
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/roullete/open/0`)
      .send({})
      .then(assert.fail)
      .catch((err) => {
        const { status } = err;
        assert.equal(400, status);
      });
  });

  it('Test to close bets correctly.', async () => {
    const data = { state: 'active' };
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));
    await Redis.rpush(`${KEY_BET}:0`, JSON.stringify(
    {
      idClient: 'Basic MTE6MQ==',
      idRoullete: '0',
      betValue: '2',
      betAmount: 222
    }));

    return chai
      .request(app)
      .post(`${API}/bet/close/0`)
      .send({})
      .then((res) => {
        const { status } = res;
        assert.equal(status, 200);
      });
  });

  it('Test to close bets when roulette does not exist.', () => chai
    .request(app)
    .post(`${API}/bet/close/0`)
    .send({})
    .then(assert.fail)
    .catch((err) => {
      const { status } = err;
      assert.equal(404, status);
    }));

  it('test to close bets when roulette is closed', async () => {
    const data = { state: 'closed' };
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));

    return chai
      .request(app)
      .post(`${API}/bet/close/0`)
      .send({})
      .then(assert.fail)
      .catch((err) => {
        const { status } = err;
        assert.equal(400, status);
      });
  });

  it('Test that lists the roulettes that have been created.', async () => {
    const data = { state: 'closed' };
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));
    await Redis.rpush(KEY_ROULLETE, JSON.stringify(data));

    return chai
      .request(app)
      .get(`${API}/roullete/`)
      .then((res) => {
        const { status, body } = res;
        assert.equal(status, 200);
        assert.equal(body.length, 3);
      });
  });
});
