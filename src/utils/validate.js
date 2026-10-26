// Input validation helpers.
function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length >= 0 && title.length <= 100;
}

module.exports = { isValidTitle };
