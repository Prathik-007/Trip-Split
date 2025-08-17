//blueprint for what a single expense looks like.
/*We needed to formally define the structure of an expense. The model ensures that every single expense saved in our database will have:
A description (e.g., "Lunch").
An amount (e.g., 25.50).
A paidBy field, which links the expense to a specific User.
A trip field, which links the expense to a specific Trip. 
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // The user who paid for this expense
    paidBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // The trip this expense belongs to
    trip: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Trip',
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;