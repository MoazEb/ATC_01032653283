const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const apiKeyAuth = require('../middleware/apiKeyAuth');




router.get('/my', apiKeyAuth, auth, async (req, res) => {
    try {

        const bookings = await Booking.find({ user: req.user.id })
            .populate('event')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error fetching bookings', error: err.message });
    }
});





router.post('/:eventId', apiKeyAuth, auth, async (req, res) => {
    try {

        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }


        const existingBooking = await Booking.findOne({ user: req.user.id, event: event._id });
        if (existingBooking) {
            return res.status(400).json({ msg: 'You have already booked this event' });
        }


        const booking = new Booking({ user: req.user.id, event: event._id });


        await booking.save();

        res.status(201).json({ msg: 'Booking successful', booking });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error booking event', error: err.message });

    }
});




router.delete('/:id', apiKeyAuth, auth, async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);


        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        if (!booking.user.equals(req.user.id)) {
            return res.status(403).json({ msg: 'Not authorized to cancel this booking' });
        }



        await booking.deleteOne();

        res.json({ msg: 'Booking cancelled successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error cancelling booking', error: err.message });
    }
});

module.exports = router;