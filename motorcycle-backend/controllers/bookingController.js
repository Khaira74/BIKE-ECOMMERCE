const Booking = require('../models/booking');

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      email,
      address,
      country,
      state,
      motorcycleId,
      price,
      tax,
      total
    } = req.body;

    const booking = await Booking.create({
      customerName,
      phoneNumber,
      email,
      address,
      country,
      state,
      motorcycleId,
      price,
      tax,
      total
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({ error });
  }
};

// GET /bookings/:id
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id); // no include

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll(); // Fetches all bookings from the database
    console.log(bookings)
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
// GET /bookings/email/:email
// POST /bookings/by-email
exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.body;
 
    if (!email) {
      return res.status(400).json({ error: "Email is required in request body" });
    }

    const bookings = await Booking.findAll({ where: { email } });

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this email" });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by email:", error);
    res.status(500).json({ error: "Failed to fetch bookings by email" });
  }
};
