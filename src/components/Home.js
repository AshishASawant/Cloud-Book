import React, { useContext, useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "./context/noteContext";
import Notecomponents from "./Notecomponents";



const Home=({setProgress})=>{
    let clickModal = useRef(null);
    const navigate=useNavigate()
    const context = useContext(noteContext)
    const {notes,addNote,getNotes,updateNote}=context

    useEffect(() => {
        if(localStorage.getItem('token')){
          getNotes()
        }
        else{
          navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    
    const [newNote, setNewnote] = useState({title:'',description:'',id:""})

    const handelonchange=(e)=>{
        setNewnote({...newNote,[e.target.name]:e.target.value})
    }

    const handelonsubmit=(e)=>{
        e.preventDefault()
        document.getElementById('noteform').reset()
        addNote(newNote)
        setNewnote({title:'',description:'',id:""})
    }

    return(
        <div className="mt-[4rem] w-[90%] flex items-center flex-column rounded-md pb-10">
        <form onSubmit={handelonsubmit} id="noteform"className="flex space-y-5 flex-col justify-center items-center mb-4 w-[100%] ">
            <input onChange={handelonchange}  type="text" name="title" id="title" placeholder="Title" className="w-full  shadow-none border border-2 remove-b border-slate-400 rounded-md p-2 mt-4 text-xl glass"  autoFocus minLength='3' />
            <textarea onChange={handelonchange}  name="description" id="description" cols="30" rows="10" placeholder="Decription" className="w-full remove-b border-4 border-slate-400 rounded-md glass p-2 mt-2 text-xl"></textarea>
            <button  type="submit" className="m-3 glass-btn text-xl bg-green-400 w-full  rounded-md p-2 ">Add Note</button>
        </form>
        <hr className="border border-4"/>
        <h1 className="text-slate-700 text-[2.4rem] ml-4">Your Notes</h1>
        <hr className="border border-4"/>
        <div className="row w-[100%]">
        {notes.length===0?<h1 className="text-white text-xl m-3">No Notes Available</h1>:notes.map(note=>{
            return <Notecomponents  key={note._id} setNewnote={setNewnote} clickModal={clickModal} note={note}/>
        })}
        </div>
        <button 
          type="button"
          ref={clickModal}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    updateNote(newNote)
                }}
                className="flex space-y-5 flex-col justify-center items-center mb-4"
              >
                <input
                  onChange={handelonchange}
                  type="text"
                  name="title"
                  value={newNote.title}
                  id="title"
                  placeholder="Title"
                  className="w-3/4 border border-2 border-slate-400 rounded-md p-2 mt-4 text-xl"
                  required
                  autoFocus
                  minLength='3'
                />
                <textarea
                  onChange={handelonchange}
                  name="description"
                  value={newNote.description}
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Decription"
                  className="w-3/4 border-4 border-slate-400 rounded-md p-2 mt-2 text-xl"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="m-3 text-xl bg-green-400 w-3/4  border border-2 border-slate-400 rounded-md p-2 "
                >
                  Add Note
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
)
}

export default Home