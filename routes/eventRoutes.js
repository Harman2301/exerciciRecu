const express = require('express');
const router = express.Router();
const joiMiddleware = require('../middlewares/joiMiddleware');
const eventController = require('../controllers/eventController');
const eventSchemas = require('../models/joi/eventSchema');
const tokenValidation = require('../middlewares/tokenValidation');
const authenticate = require('../middlewares/autenticate');


router.post('/events',
  tokenValidation,
  authenticate,
  joiMiddleware.validate(eventSchemas.createEventSchema, 'body'),
  eventController.create
);

router.get('/events/:id', tokenValidation, authenticate, eventController.getEventById);
router.get('/', tokenValidation, authenticate, eventController.getAllEvents);


module.exports = router;

