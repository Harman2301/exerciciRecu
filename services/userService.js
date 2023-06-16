const mongoose = require('mongoose');
const User = require('../models/db/userModel');
const repository = require('../db/repository');


module.exports.create = async (userFromController) => {
  const response = { status: false };
  try {
    const user = new User(userFromController);
    const resFromRepo = await repository.create(user);
    if (resFromRepo.status) {
      response.result = resFromRepo.result;
      response.status = true;
    }
  } catch(err) {
    console.log('ERROR-userService-create: ', err);
  }
  return response;
}

module.exports.login = async (userEmail) => {
    const response = { status: false };
    try {
        const data = {
            findQuery: {
                email: userEmail,
            },
            model: User,
        };
        const resFromRepo = await repository.findOne(data);
        if (resFromRepo.status) {
            response.status = true;
            response.result = resFromRepo.result;
        }
    } catch (err) {
        console.log('ERROR-authService-login: ', err);
    }
    return response;
  };


  module.exports.findById = async (userId) => {
    const response = { status: false };
    try {
      const data = {
        _id: new mongoose.Types.ObjectId(userId),
        model: User,
        projection: {}
      };
      console.log(data);
      const resFromRepo = await repository.selectById(data, '');
      if (resFromRepo.status) {
        response.result = resFromRepo.result;
        response.status = true;
      }
    } catch(err) {
      console.log('ERROR-userService-selectById: ', err);
    }
    return response;
  }


    
