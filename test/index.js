const { expect } = require('chai');
const { agent } = require('supertest');
const app = require('../app');
const request = agent;
describe('SIMPLE APP TESTING', () => {
  it('Get request to /test returns "Node App Working!"', async () => {
    const res = await request(app).get('/test');
    const textResponse = res.body;
    expect(res.status).to.equal(200);
    expect(textResponse.text).to.be.a('string');
    expect(textResponse.text).to.equal('Simple Node App Working!');
  });
});