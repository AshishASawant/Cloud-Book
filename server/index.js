const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const connectTODb = require("./db");

//environment variable
require('dotenv').config()

//connecting to db
connectTODb();

// midelware
app.use(express.json());
app.use(cors());

//Available routes
app.use("/api/users", require("./routes/userroutes"));
app.use("/api/notes", require("./routes/notesroutes"));

//listen
app.listen(port, () => {
  console.log(`app successfully running on port ${port}`);
});
