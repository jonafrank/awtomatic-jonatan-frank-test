import _ from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { app, server } from './app';

const mockListen = jest.fn();
app.listen = mockListen;

describe('/users Calls', () => {
  afterEach(() => {
    mockListen.mockReset();
  });
  afterAll(() => {
    server.close();
  });
  test('/users should return Unauthorized with no token', async () => {
    const response = await request(app.callback()).get('/users');
    expect(response.status).toBe(401);
  });
  test('/users should return Forbbiden with invalid token', async () => {
    const response = await request(app.callback())
      .get('/users')
      .set('X-Awtomatic-Access-Token', 'invalid');
    expect(response.status).toBe(403);
  });
  test('/users should return 200 with a list of all users', async () => {
    const response = await request(app.callback())
      .get('/users')
      .set('X-Awtomatic-Access-Token', 'token');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
  });
  test('/users should filter by email contains', async () => {
    const response = await request(app.callback())
      .get('/users?emailContains=sherwood')
      .set('X-Awtomatic-Access-Token', 'token');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(8);
  });
  test('/users should return empty array when no results', async () => {
    const response = await request(app.callback())
      .get('/users?emailContains=invalidemailcontains')
      .set('X-Awtomatic-Access-Token', 'token');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
  test('/user filter by location in radius of 10km', async () => {
    const response = await request(app.callback())
      .get('/users?coordinate=29.45722101803548,-164.29865935960245')
      .set('X-Awtomatic-Access-Token', 'token');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(4);
  });
  test('/user filter by location in radius of 2000km', async () => {
    const response = await request(app.callback())
      .get('/users?coordinate=29.45722101803548,-164.29865935960245&radius=2000')
      .set('X-Awtomatic-Access-Token', 'token');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBe(4);
    expect(response.body[1].id).toBe(9);
  });
  test('/user filter fields', async () => {
    const response = await request(app.callback())
      .get('/users?fields=id,name,username,email,phone,website,company')
      .set('X-Awtomatic-Access-Token', 'token');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
    _.forEach(response.body, (val) => {
      expect(val.address).toBe(undefined);
    });
  });
});
