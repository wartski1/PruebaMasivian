const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const Helper = require('../Helper');

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
});
