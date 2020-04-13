const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://demola:demola@cluster0-yxizt.mongodb.net/test?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('CONNECTED TO MONGO');
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
