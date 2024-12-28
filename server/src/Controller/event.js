const EventSchema = require('../Model/event')

// Create an event

const createEvent = async (req, res) => {
    try {

        const { EventName, EventDate, EventTime, EventDescriptions } = req.body;

        if (!EventName || !EventDate || !EventTime || !EventDescriptions) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const newEvent = await EventSchema.create({
            EventName,
            EventDate,
            EventTime,
            EventDescriptions
        });
        res.status(201).json({ mesaage: "Event created successfully", newEvent });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await EventSchema.find();
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get update events
// const getUpdateEvent = async (req, res) => {
//     try {
//         const event = await EventSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!event) return res.status(404).json({ message: "Event not found" });
//         res.json(event);
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// Delete event
const deleteEvent = async (req, res) => {
    try {
        const event = await EventSchema.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { createEvent, getAllEvents, deleteEvent };
