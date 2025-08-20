const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const verifyToken = require('../middleware/verifyToken');

const validateUser = require('../middleware/validateUser');       
router.post('/login', userController.loginUser);
router.post('/', validateUser, userController.createUser);
router.get('/', userController.getAllUsers);       
router.get('/:id', userController.getUserById); 

router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 

module.exports = router;