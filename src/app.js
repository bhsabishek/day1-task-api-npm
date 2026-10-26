
const express = require('express');

const app = express();

app.use(express.json());

// Store tasks in memory
const tasks = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Create a task
app.post('/tasks', (req, res) => {
  const title =
    typeof req.body?.title === 'string'
      ? req.body.title.trim()
      : '';

  if (!title) {
    return res.status(400).json({
      error: 'Title is required',
    });
  }

  const task = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

// Mark a task as complete
app.patch('/tasks/:id/complete', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found',
    });
  }

  task.completed = true;

  return res.status(200).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Task not found',
    });
  }

  tasks.splice(index, 1);

  return res.status(200).json({
    message: 'Task deleted successfully',
  });
});

module.exports = app;