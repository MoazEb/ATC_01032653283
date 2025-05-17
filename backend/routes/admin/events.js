const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');
const auth = require('../../middleware/auth');
const authorizeRole = require('../../middleware/authorizeRole');
const { upload, cloudinary } = require('../../config/cloudinary');
const apiKeyAuth = require('../../middleware/apiKeyAuth');


router.post('/', apiKeyAuth, auth, authorizeRole('admin'), upload.single('image'), async (req, res) => {
    const { name, description, category, date, venue, price } = req.body;

    console.log(req.body)

    if (!name || !description || !category || !date || !venue || !price) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path;
        }

        else if (req.body.image) {
            imageUrl = req.body.image;
        } else {
            return res.status(400).json({ msg: 'Please provide an image file or URL' });
        }

        const event = new Event({
            name,
            description,
            category,
            date,
            venue,
            price,
            image: imageUrl
        });

        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: 'Error creating event', error: err.message });
    }
});

router.put('/:id', apiKeyAuth, auth, authorizeRole('admin'), upload.single('image'), async (req, res) => {
    const { name, description, category, date, venue, price } = req.body;

    if (!name || !description || !category || !date || !venue || !price) {
        return res.status(400).json({ msg: 'Please provide all required fields for update' });
    }

    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        const updateData = {
            name,
            description,
            category,
            date,
            venue,
            price
        };

        if (req.file) {
            if (event.image && event.image.includes('cloudinary')) {
                const publicId = event.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`events/${publicId}`);
            }
            updateData.image = req.file.path;
        } else if (req.body.image && req.body.image !== event.image) {
            updateData.image = req.body.image;
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedEvent);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: 'Error updating event', error: err.message });
    }
});

router.get('/', apiKeyAuth, auth, async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error fetching events', error: err.message });
    }
});

router.delete('/:id', apiKeyAuth, auth, authorizeRole('admin'), async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        if (event.image && event.image.includes('cloudinary')) {
            const publicId = event.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`events/${publicId}`);
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error deleting event', error: err.message });
    }
});

module.exports = router;