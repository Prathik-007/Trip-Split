/*We needed a reusable piece of logic to check if a user is who they say they are. This bouncer's job is to:
Check for an ID: It looks in the request's "authorization header" for a JWT (the user's digital ID card). If there's no token, it immediately denies access.
Verify the ID: It uses jwt.verify() to check if the token is legitimate and hasn't expired. If it's a fake or old token, it denies access.
Identify the User: If the token is valid, the bouncer decodes it to get the user's ID. It then fetches that user's information from the database and attaches it to the request object (req.user). This is super important because it means the next function in the chain will know exactly who is making the request.
Grant Access: Finally, it calls next(), which is like the bouncer saying, "You're good to go," and letting the request proceed to its intended destination (the createTrip controller). 
*/

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the request headers contain an "Authorization" token
  // and if it starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Get the token from the header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database using the ID from the token
      // and attach the user object to the request (req.user)
      // We exclude the password from being attached.
      req.user = await User.findById(decoded.id).select('-password');
      
      // 4. Move on to the next function in the chain (our controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };