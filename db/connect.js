const mongoose = require('mongoose');

module.exports.createConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('DB connected!');

    mongoose.connection.on('error', (error) => {
      console.log('ERROR The connection was interrupted: ', error);
    });
  } catch (err) {
    console.log('ERROR Cannot connect to the DB: ', err);
  }
}