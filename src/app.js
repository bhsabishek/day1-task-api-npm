const express = require('express');
const morgan = require('morgan');
const { isValidTitle } = require('./utils/validate');
const store = require('./store');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.get('/tasks', (req, res) => {
  res.json(store.all());
});

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};
  if (!isValidTitle(title)) {
    return res.status(400).json({ error: 'title is required (1-100 characters)' });
  }
  res.status(201).json(store.add(title.trim()));
});

app.patch('/tasks/:id/complete', (req, res) => {
  const task = store.complete(Number(req.params.id));
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ error: 'task not found' });
  }
  res.status(204).end();
});

module.exports = app;
