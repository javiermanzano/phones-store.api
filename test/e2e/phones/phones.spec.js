const supertest = require('supertest');
const {
  OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST, CREATED,
} = require('http-status-codes');
const createApp = require('../../../app');
const db = require('../../../db');
const seed = require('../../seed');
const truncate = require('../../truncate');

describe('Phones', () => {
  let request;
  beforeAll(async (done) => {
    const app = await createApp();
    request = supertest(app);
    done();
  });

  beforeEach(async () => {
    await db.initDatabase();
    await seed();
  });

  it('Get all phones', async (done) => {
    const response = await request.get('/phones');
    expect(response.status).toBe(OK);
    expect(response.body).toHaveLength(8);
    done();
  });

  it('Deletes a phone', async (done) => {
    const phonesResponse = await request.get('/phones');
    const phoneId = phonesResponse.body[0].id;
    const response = await request
      .delete(`/phones/${phoneId}`);
    expect(response.status).toBe(OK);
    expect(response.body.deleted).toBe(true);
    const deletedphoneResponse = await request.get(`/phones/${phoneId}`);
    expect(deletedphoneResponse.body.message).toBe('Error while finding phone Error: This phone was deleted or does not exists: 101');
    done();
  });

  it('Gets a phone & updates it', async (done) => {
    const phonesResponse = await request.get('/phones');
    const phoneId = phonesResponse.body[0].id;
    const response = await request
      .put(`/phones/${phoneId}`)
      .send({ model: 'new model' });
    expect(response.status).toBe(OK);
    const getPhoneResponse = await request.get(`/phones/${phoneId}`);
    expect(getPhoneResponse.body.model).toBe('new model');
    done();
  });

  it('Creates phone', async (done) => {
    let response = await request
      .post('/phones')
      .send({
        model: 'Model 1',
        vendor: 'Vendor 1',
        image: 'http://image1.com',
      });
    expect(response.status).toBe(CREATED);
    expect(response.body.model).toBe('Model 1');
    expect(response.body.vendor).toBe('Vendor 1');
    expect(response.body.image).toBe('http://image1.com');

    response = await request.get('/phones');
    expect(response.status).toBe(OK);
    expect(response.body).toHaveLength(9);
    done();
  });


  afterEach(async (done) => {
    await truncate();
    done();
  });

  afterAll(async (done) => {
    await db.stop();
    done();
  });
});
