const User = require('../models/user'); // Adjust the path if needed
const moment = require('moment');

// Helper function to check if the user is at least 18 years old
const checkAge = (dob) => {
  const today = moment();
  const birthDate = moment(dob);
  const age = today.diff(birthDate, 'years');
  return age >= 18;
};

const validateUser = async (req, res, next) => {
  const { Password, phoneno, emailid, DOB } = req.body;

  // Validate password length (minimum 8 characters)
  if (Password && Password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  // Validate phone number (should be exactly 10 digits and only numbers)
  const phoneRegex = /^\d{10}$/;
  if (!phoneno || !phoneRegex.test(phoneno)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
  }

  // Validate email format and check if it already exists in the database
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailid || !emailRegex.test(emailid)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const existingUser = await User.findOne({ where: { emailid } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email address is already in use.' });
  }

  // Validate the user’s age (should be at least 18)
    if (!DOB || !checkAge(DOB)) {
        return res.status(400).json({ message: 'User must be at least 18 years old.' });
    }

  // If all validations pass, proceed to the next middleware (or controller)
  next();
};

module.exports = validateUser;
