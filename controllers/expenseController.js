//the logic for handling the submission of that expense form.
/*The addExpense function acts as a diligent manager who:
Checks the Form: It first validates that all the required fields (description, amount, tripId) were actually submitted.
Verifies the Trip: It checks if the tripId is valid and that the trip actually exists.
Performs a Security Check: This is the most critical part. It checks if the user trying to add the expense (req.user._id) is actually a member of the trip. This prevents a user from one trip from maliciously adding expenses to a completely different trip they aren't part of.
Approves and Files: If all checks pass, it uses the Expense model to create the new expense and save it to the database. 
*/

const Expense = require('../models/Expense');
const Trip = require('../models/Trip');

// @desc    Add a new expense to a trip
// @route   POST /api/expenses
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { description, amount, tripId } = req.body;
    const paidById = req.user._id; // From our 'protect' middleware

    // 1. Basic Validation
    if (!description || !amount || !tripId) {
      return res.status(400).json({ message: 'Please provide description, amount, and tripId' });
    }

    // 2. Find the trip in the database
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // 3. Check if the logged-in user is actually a member of the trip
    // .includes() doesn't work well with ObjectId types, so we convert to strings
    const memberIds = trip.members.map(id => id.toString());
    if (!memberIds.includes(paidById.toString())) {
      return res.status(403).json({ message: 'User is not a member of this trip' });
    }

    // 4. Create the new expense
    const expense = new Expense({
      description,
      amount,
      paidBy: paidById,
      trip: tripId,
    });

    const createdExpense = await expense.save();

    // Note: We are not adding the expense to the trip's 'expenses' array here.
    // It's often more efficient to fetch expenses separately by querying for the tripId.
    
    res.status(201).json(createdExpense);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};