// the URL endpoint or the "mailing address" for submitting an expense.
/* We needed to give our future Flutter app a specific address to send expense data to. This file creates the endpoint POST /api/expenses. It also crucially places our security guard (protect middleware) at the door, ensuring that only a logged-in user can even attempt to submit an expense.*/

const express = require('express');
const router = express.Router();
const { addExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// A POST request to /api/expenses will be protected and then trigger addExpense
router.post('/', protect, addExpense);

module.exports = router;