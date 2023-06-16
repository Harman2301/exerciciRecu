const Event = require('../models/db/eventModel');

module.exports.getById = async(data) => {
    try {
      const doc = await data.model.findOne({ _id: data._id }); // Use only the _id from data
      return {
        status: true,
        result: doc
      }
    } catch (err) {
      console.log('Repository-getById:', err);
      return { status: false };
    }
    }

  
  module.exports.getAll = async(data) => {
    try {
      const doc = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
      return {
        status: true,
        result: doc
      }
    } catch (err) {
      console.log('Repository-getAll:', err);
      return { status: false };
    }
  }
  
  module.exports.create = async(objToSave) => {
    try {
      const doc = await objToSave.save();
      return {
        status: true,
        result: doc
      }
    } catch (err) {
      console.log('Repository-create:', err);
      return { status: false };
    }
  }
  
  module.exports.update = async (data) => {
    try {
      const doc = await data.model.findOneAndUpdate(data.findQuery, data.findUpdate, {
        projection: data.projection,
        new: true,
        useFindAndModify: false,
      });
      if (doc) {
        return {
          status: true,
          result: doc
        };
      }
    } catch (err) {
      console.log('Repository-update:', err);
    }
    return { status: false };
  }
  
  module.exports.delete = async (data) => {
    try {
      const doc = await data.model.findOneAndDelete(data.findQuery, { projection: data.projection });
      if (doc) {
        return {
          status: true,
          result: doc
        }
      }
    } catch (err) {
      console.log('Repository-delete:', err);
    }
    return { status: false };
  }
  
  module.exports.findOne = async (data) => {
    let responseObj = { status: false };
    try {
      const doc = await data.model.findOne(data.findQuery);
      responseObj = {
        result: doc,
        status: true
      };
    } catch (error) {
      responseObj.error = error;
      console.log(`ERROR-crudRepository-findOne: ${error}`);
    }
    return responseObj;
    
    }; 
    
    module.exports.selectById = async (id, options) => {
      const response = { status: false };
      try {
        const result = await Event.findById(id, options); 
        if (result) {
          response.result = result;
          response.status = true;
        }
      } catch (err) {
        console.log('ERROR-repository-selectById: ', err);
      }
      return response;
    };
      
    module.exports.findAll = async (model) => {
        try {
          const result = await model.find();
          return result;
        } catch (err) {
          console.log('ERROR-repository-findAll: ', err);
          return null;
        }
      };
      
      
      