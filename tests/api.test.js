const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => store.reset());

describe('health', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('tasks', () => {
  test('GET /tasks starts empty', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Learn CI' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Learn CI', done: false });
  });

  test('POST /tasks rejects an empty or blank title', async () => {
    const empty = await request(app).post('/tasks').send({ title: '' });
    const blank = await request(app).post('/tasks').send({ title: '   ' });
    expect(empty.status).toBe(400);
    expect(blank.status).toBe(400);
  });

  test('ids stay unique after a delete', async () => {
    await request(app).post('/tasks').send({ title: 'a' });
    await request(app).post('/tasks').send({ title: 'b' });
    await request(app).delete('/tasks/1');
    await request(app).post('/tasks').send({ title: 'c' });
    const res = await request(app).get('/tasks');
    const ids = res.body.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('PATCH /tasks/:id/complete marks a task done', async () => {
    await request(app).post('/tasks').send({ title: 'a' });
    const res = await request(app).patch('/tasks/1/complete');
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test('PATCH /tasks/:id/complete returns 404 for unknown id', async () => {
    const res = await request(app).patch('/tasks/999/complete');
    expect(res.status).toBe(404);
  });

  test('DELETE /tasks/:id returns 404 for unknown id', async () => {
    const res = await request(app).delete('/tasks/999');
    expect(res.status).toBe(404);
  });
});
