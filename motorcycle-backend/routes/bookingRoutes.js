const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/bookings/:id', bookingController.getBookingById);
router.get('/orders',bookingController.getAllBookings)
router.post('/allorders',bookingController.getBookingsByEmail)
module.exports = router;
