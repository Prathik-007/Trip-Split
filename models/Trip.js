//blueprint for what a "trip" is in our database.
/* 
 Before we can save a trip, our database needs to know exactly what information a trip should contain. The model enforces these rules. We decided that every trip must have:
A name (like "Paris Adventure").
A createdBy field, which stores the ID of the user who created it. The ref: 'User' part is crucial—it creates a direct link between the trip and a specific user.
A list of members, which is an array that will hold the IDs of everyone on the trip.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    // This creates a relationship between the Trip and the User model.
    // It stores the ID of the user who created the trip.
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This tells Mongoose the ID belongs to a User document
    },
    // This will be an array of user IDs for all members of the trip.
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // We will add expenses later, so we'll leave this empty for now.
    expenses: [
      {
        // We will define the expense schema later
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;