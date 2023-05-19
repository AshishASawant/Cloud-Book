import { useState } from "react";
import Notecontext from "./noteContext";
import swal from "sweetalert";

const Notestate = (props) => {
  let { setProgress } = props;
  const [notes, setNotes] = useState([]);
  const url =
    "https://cloudbook-backend-q9wnf73k6-ashishasawant.vercel.app/api/";

  //fetch all user specific notes
  const getNotes = async () => {
    setProgress(20);
    const data = await fetch(`${url}notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    setProgress(70);
    let json = await data.json();
    setNotes(json);
    setProgress(100);
  };

  const addNote = async (newNote) => {
    setProgress(50);
    await fetch(`${url}notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newNote),
    });
    getNotes();
    setProgress(100);
  };

  const deleteNote = (noteid) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your note has been deleted!", {
          icon: "success",
        });
        setProgress(50);
        fetch(`${url}notes/deletenote/${noteid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }).then(() => {
          getNotes();
          setProgress(100);
        });
      }
    });
  };

  const updateNote = async (newNote) => {
    setProgress(20)
    await fetch(`${url}notes/updatenote/${newNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: newNote.title,
        description: newNote.description,
      }),
    });
    getNotes();
    setProgress(100)
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
