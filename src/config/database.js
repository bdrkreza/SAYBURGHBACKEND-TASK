const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.a3up8.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(uri, options);
    console.log("mongodb connection established");
    mongoose.Promise = global.Promise;
  } catch (error) {
    console.log("connection error", error);
  }
};

module.exports = connectMongoDB;