const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { SECRET_KEY, expiresIn } = require("../config/jwtconfig"); // ✅ adjust path if needed
const { checkUserCredentials } = require('../middleware/loginmiddleware');
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({ 
      userid: req.body.userid,
      Password: req.body.Password,
      username: req.body.username,
      emailid: req.body.emailid,
      phoneno: req.body.phoneno,  
      DOB: req.body.DOB,
      roleid: req.body.roleid
    });

    const token = jwt.sign({ userid: newUser.userid }, SECRET_KEY, {
      expiresIn,
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser,
      token // send the token if needed on signup
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({userid:req.params.userid});
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { Password, username, emailid, phoneno, DOB, roleid } = req.body;
        const user = await User.findByPk(req.params.userid);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ Password, username, emailid, phoneno, DOB, roleid });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userid);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


    
exports.loginUser = async (req, res) => {
  try {
    const { emailid, Password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { emailid } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });  // More specific error message
    }

    // Check if the password matches
    if (user.Password !== Password) {
      return res.status(401).json({ message: "Incorrect password" });  // More specific error message
    }

    // Generate the JWT token
    const token = jwt.sign({ userid: user.userid }, SECRET_KEY, {
      expiresIn,
    });

    // Return success response with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};