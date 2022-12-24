const mongoose = require("mongoose");

noteSchema = new mongoose.Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
  },
  title: {
    type:String,
    required:true,
  },
  description:  {
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now
  },
});

let notesModel = mongoose.model("Note", noteSchema);

module.exports = notesModel;
