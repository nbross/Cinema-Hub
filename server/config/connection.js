const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cinema-hub', {
=======
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Cinema-Hub", {
>>>>>>> addbcfa5484db271753949bb4f2b83ee41ea00b1
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;