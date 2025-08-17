# Trip-Split
TripSplit - Collaborative Expense Tracker
TripSplit is a full-stack, cross-platform application designed to simplify expense tracking for groups and trips. Built with a Flutter frontend and a Node.js backend, it provides a real-time, transparent way for users to manage shared finances, from initial contributions to final settlements.

✨ Key Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Trip Management: Users can create new trips and will be able to invite others to join.

Expense Logging: Add expenses with descriptions and amounts to a specific trip.

Real-time Updates: (Planned) Live synchronization of expenses across all trip members' devices.

Secure Endpoints: Protected API routes ensure that only authorized members can view or modify trip data.

Clear Summaries: (Planned) A detailed breakdown of who paid for what and who owes whom, simplifying settlements.

🛠️ Technology Stack
This project is a monorepo containing two main parts: the backend server and the frontend application.

Backend (Node.js)
Framework: Node.js with Express.js

Database: MongoDB with Mongoose ODM

Authentication: JSON Web Tokens (JWT) & bcryptjs for password hashing

Development: nodemon for live server reloading

Environment: dotenv for managing environment variables

Frontend (Flutter)
Framework: Flutter SDK

Language: Dart

State Management: (To be added) Provider, Riverpod, or Bloc

HTTP Client: (To be added) http or dio package

Navigation: (To be added) Navigator 2.0 or a package like go_router

🚀 Getting Started
Follow these instructions to get a local copy of the project up and running for development and testing.

Prerequisites
Node.js installed

Flutter SDK installed

A MongoDB Atlas account or a local MongoDB instance

A code editor like VS Code with Flutter & Dart extensions

1. Backend Setup
Navigate to the backend directory:

cd trip-split-backend

Install NPM packages:

npm install

Create a .env file in the root of the trip-split-backend directory and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

Start the development server:

npm start

The server will be running on http://localhost:5000.

2. Frontend Setup
Navigate to the frontend directory:

cd ../tripsplit_app

Get Flutter packages:

flutter pub get

Run the app:
Open an emulator or connect a physical device, then run:

flutter run

