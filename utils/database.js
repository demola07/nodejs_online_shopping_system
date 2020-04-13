const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://demola:demola@cluster0-yxizt.mongodb.net/test?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('CONNECTED TO MONGO');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
