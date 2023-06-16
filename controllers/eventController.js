const c = require("../config/constants");
const eventService = require('../services/eventService');
const userService = require('../services/userService');

const jwt = require('jsonwebtoken');


module.exports.create = async (req, res) => {
    const response = { status: c.status.serverError, msg: 'Internal server error' };
    try {
        const event = req.body;
        event.active = true;
        const resFromService = await eventService.create(event);
        if (resFromService.status) {
            response.status = c.status.created;
            response.msg = 'Event created';
            response.body = resFromService.result;
        }
    } catch (err) {
        console.log('ERROR-eventController-create: ', err);
        response.error = err;
    }
    res.status(response.status).send(response);
  };

module.exports.getAllEvents = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const events = await eventService.getAllEvents();

    if (!events) {
      return res.status(500).json({ error: 'Error al obtener eventos.' });
    }

    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret123');
      if (decoded) {
        for (const event of events) {
          const participants = await eventService.getEventAttendees(event._id);
          event.participants = participants;
        }
      }
    } else {
      for (const event of events) {
        event.participants = undefined;
      }
    }

    return res.json(events);
  } catch (error) {
    console.log('ERROR-eventController-getAllEvents: ', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

  
module.exports.getEventById = async (req, res) => {
    const { id } = req.params;
    const { tokenPayload } = req;
  
    try {
      if (id) {
        const event = await eventService.getEventById(id);
        if (!event) {
          return res.status(404).json({ error: 'No se ha encontrado un evento con el ID proporcionado.' });
        }
  
        if (tokenPayload) {
          const attendees = await eventService.getEventAttendees(id);
          event.attendees = attendees;
        } else {
          event.participants = undefined;
        }
  
        return res.json(event);
      }
  
      const events = await eventService.getAllEvents();
      return res.json(events);
    } catch (error) {
      console.log('ERROR-eventController-getEventById: ', error);
      return res.status(500).json({ error: 'Error del servidor' });
    }
  };
  
  

