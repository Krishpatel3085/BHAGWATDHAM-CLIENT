const express = require('express')
const { createEvent, getAllEvents, deleteEvent } = require("../Controller/event")


const event_router = express.Router()

event_router.get('/getEvent', getAllEvents)
event_router.post('/CreateEvent', createEvent)
event_router.delete('/DeleteEvent/:id', deleteEvent)
// event_router.put('/UpdateEvent', getUpdateEvent)

module.exports = { event_router };