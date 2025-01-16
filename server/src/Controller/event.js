const EventSchema = require('../Model/event')

// Create an event

const createEvent = async (req, res) => {
    try {

        const { EventName, EventDate, EventTime, EventDescriptions } = req.body;

        if (!EventName || !EventDate || !EventTime || !EventDescriptions) {
            return res.status(400).json({ message: "All fields are required" });
        };

        // Get the current date and time
        const currentDate = new Date();
        const eventDateTime = new Date(`${EventDate}T${EventTime}`);

        // Determine the event status
        let EventStatus = "Upcoming";
        if (eventDateTime.toDateString() === currentDate.toDateString()) {
            EventStatus = "Today";
        } else if (eventDateTime < currentDate) {
            EventStatus = "Past";
        }

        const newEvent = await EventSchema.create({
            EventName,
            EventDate,
            EventTime,
            EventDescriptions,
            EventStatus
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
        res.status(200).json({ Message: "Teachers found", events });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//  update events
const UpdateEvent = async (req, res) => {
    try {
        // Destructure updated fields from the request body
        const { EventDate, EventTime } = req.body;

        // If `EventDate` and `EventTime` are provided, calculate the `EventStatus`
        let EventStatus;
        if (EventDate && EventTime) {
            const currentDate = new Date();
            const eventDateTime = new Date(`${EventDate}T${EventTime}`);

            if (eventDateTime.toDateString() === currentDate.toDateString()) {
                EventStatus = "Today";
            } else if (eventDateTime < currentDate) {
                EventStatus = "Past";
            } else {
                EventStatus = "Upcoming";
            }

            // Add the calculated EventStatus to the request body
            req.body.EventStatus = EventStatus;
        }

        // Update the event and return the updated document
        const event = await EventSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


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

module.exports = { createEvent, getAllEvents, deleteEvent, UpdateEvent };
