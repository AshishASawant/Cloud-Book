const express = require("express");
const router = express.Router();
const fetchdata = require("../middleware/middleware");
const Notes = require("../models/Notesmodel");
const { body, validationResult } = require("express-validator");


// fetch all the user notes using get request : http://localhost:5000/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchdata, async(req, res) => {
  try {
    Notes.find({userid:req.userid}).then(note=>{
      res.json(note)
    }).catch(err=>res.send('no nots fouhdsah'))
  } catch (error) {
    res.send("internal server error");
    console.log(error);
  }
});


//add notes using post request : http://localhost:5000/api/notes/addnote
router.post("/addnote",body('title','title must not be empty and its min length should be 3').isLength({min:3}) ,fetchdata, (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  try {
    //userid came from the middelware
    userid = req.userid;

    //creating and saving the note
    Notes.create({
      userid:req.userid,
      title: req.body.title,
      description: req.body.description,
    }).then((note) => res.json(note))
  } catch (error) {
    res.send("internal server error");
    console.log(error);
  }
  //userid came from the middelware
});

//updating a note using put request : http://localhost:5000/api/notes/updatenote/:id
router.put('/updatenote/:id',fetchdata,(req,res)=>{
  const {title,description}=req.body
  // newNote obj
  let newNote={
  }
  if(title){newNote.title=title}
  if(description){newNote.description=description}

  //check if note with this id exists
  Notes.findById(req.params.id).then(
    (note)=>{
      
      //check if the note belongs to logedin user
      if(note.userid.toString()!==req.userid){
        console.log(note.userid.toSting())
        return res.send('not allowed')
      }
      // update note
      Notes.findByIdAndUpdate(req.params.id,newNote,{new:true}).then(note=>res.json(note))
    }
  ).catch(err=>{
    console.log(err)
    res.send('No note found')
  })

})

//deleting a note using delete request : http://localhost:5000/api/notes/deletenote/:id
router.delete('/deletenote/:id',fetchdata,(req,res)=>{

  //check if note with this id exists
  Notes.findById(req.params.id).then(
    (note)=>{
      //check if the note belongs to logedin user
      if(note.userid.toString()!==req.userid){
        console.log(note.userid.toSting())
        return res.send('not allowed')
      }
      // delete note
      Notes.findByIdAndDelete(req.params.id).then(note=>res.json({msg:"note deleted"}))
    }
  ).catch(err=>{
    console.log(err)
    res.send('No note found')
  })

})

module.exports = router;
