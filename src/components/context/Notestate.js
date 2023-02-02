import { useState } from "react";
import Notecontext from "./noteContext";
import swal from "sweetalert";

const Notestate = (props) => {

  const [notes, setNotes] = useState([]);
  const url = "https://cloudbook-backend-q9wnf73k6-ashishasawant.vercel.app/api/";

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
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your note has been deleted!", {
          icon: "success",
        });
        fetch(`${url}notes/deletenote/${noteid}`,{method:'DELETE',headers:{
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }}).then(()=>getNotes())
      } 
    });
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
