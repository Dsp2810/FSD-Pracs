var express = require('express');
var router = express.Router();

// GET calculator form
router.get('/', function(req, res, next) {
  res.render('calculator', { result: null, error: null, n1: '', n2: '', op: 'add' });
});

// POST calculator operation
router.post('/', function(req, res, next) {
  const n1 = req.body.n1;
  const n2 = req.body.n2;
  const op = req.body.op;
  let result = null;
  let error = null;

  // Validate input
  if (isNaN(n1) || isNaN(n2) || n1 === '' || n2 === '') {
    error = 'Please enter valid numbers.';
  } else {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    switch(op) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          error = 'Cannot divide by zero.';
        } else {
          result = num1 / num2;
        }
        break;
      default:
        error = 'Invalid operation.';
    }
  }
  res.render('calculator', { result, error, n1, n2, op });
});

module.exports = router;
