// In-memory data store. Data is lost whenever the process restarts.
let tasks = [];

function all() {
  return tasks;
}

function add(title) {
  const task = { id: tasks.length + 1, title, done: false };
  tasks.push(task);
  return task;
}

function complete(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = true;
  return task;
}

function remove(id) {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}

function reset() {
  tasks = [];
}

module.exports = { all, add, complete, remove, reset };
