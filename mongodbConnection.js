const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/userAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    connectTimeoutMS: 10000,
    family: 4,
  })
  .catch((err) => console.log(err));

mongoose.connection.on(
  "error",
  console.error.bind(console, "mongo connection error:")
);

exports = mongoose;
