const express = require('express');
const router = express.Router();
const multer = require("multer");

const userController = require('../controllers/userController');
const joiMiddleware = require('../middlewares/joiMiddleware');
const userSchemas = require('../models/joi/userSchema');



router.post('/register',
  joiMiddleware.validate(userSchemas.createUserSchema, 'body'),
  userController.register
);

router.post('/login',
    joiMiddleware.validate(userSchemas.loginSchema, 'body'),
    userController.login
);

module.exports = router;