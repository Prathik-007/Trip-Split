//When a user wants to create a trip, we need a function to handle that request. The createTrip function is that handler. Its job is to:
/*Take the incoming request (which contains the trip's name).
Check if the name exists.
Use the Trip model (the blueprint) to construct a new trip object.
Save that object to the database.
Send back a success response. 
*/
const Trip = require('../models/Trip');

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private (we'll make this private later)
exports.createTrip = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a trip name' });
    }

     // Get the user ID from the req.user object that our middleware provides
    const createdByUserId = 'req.user._id'; 

    const trip = new Trip({
      name,
      createdBy: createdByUserId,
      members: [createdByUserId], // The creator is automatically a member
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};