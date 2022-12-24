import { useState } from "react";
import Notecontext from "./noteContext";
const Notestate = (props) => {

  const [notes, setNotes] = useState([]);
  const url = "http://localhost:5000/api/";

  //fetch all user specific notes
  const getNotes = async() => {
    const data = await fetch(
      `${url}notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      }
    )
    let json=await data.json()
    setNotes(json)
  };

  const addNote = async (newNote) => {

    await fetch(`${url}notes/addnote`,{method:'POST',headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body:JSON.stringify(newNote)
  })

    getNotes()
  };

  const deleteNote = (noteid) => {
    fetch(`${url}notes/deletenote/${noteid}`,{method:'DELETE',headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }}).then(()=>getNotes())
  };

  const updateNote = async(newNote) => {

    await fetch(`${url}notes/updatenote/${newNote.id}`,{method:"PUT",headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },body:JSON.stringify({
      title:newNote.title,
      description:newNote.description
    })})

    getNotes()
  };
  return (
    <Notecontext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
