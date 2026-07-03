const request = require('supertest');
const app = require('./server');

describe('Server Health Checks', () => {
  test('Health endpoint returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('API endpoint returns version info', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body.version).toBeDefined();
  });

  test('404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});
