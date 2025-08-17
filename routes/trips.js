//This file defines the specific URL endpoint that our frontend app will communicate with.

const express = require('express');
const router = express.Router();
const { createTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
// To create a trip, the user must first pass through the 'protect' middleware.
// If they are authorized, it will then call 'createTrip'.
// A POST request to /api/trips will trigger the createTrip function
router.post('/', createTrip);

module.exports = router;