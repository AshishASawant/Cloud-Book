const mongoose = require("mongoose");

connectTODb = () => {
  mongoose.connect("mongodb://localhost:27017/cloudbook").then(() => {
    console.log("successfully connected to database");
  });
};

module.exports = connectTODb;
