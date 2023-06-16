const Event = require('../models/db/eventModel');
const repository = require('../db/repository');

module.exports.create = async (eventData) => {
        const response = { status: false };
        try {
          const event = new Event(eventData);
          const resFromRepo = await repository.create(event);
          if (resFromRepo.status) {
            response.result = resFromRepo.result;
            response.status = true;
          }
        } catch(err) {
          console.log('ERROR-eventService-create: ', err);
        }
        return response;
}


module.exports.getAllEvents = async () => {
    try {
      const events = await repository.findAll(Event);
      return events;
    } catch (error) {
      console.log('ERROR-eventService-getAllEvents: ', error);
      return null;
    }
  };
  
module.exports.getEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};


module.exports.getEventAttendees = async (eventId) => {
    const event = await Event.findById(eventId).populate('participants');
    return event.participants; 
};



