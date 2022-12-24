import React, { useContext } from "react";
import noteContext from "./context/noteContext";

const Notecomponents = (props) => {
  let { _id, title, description } = props.note;

  const context = useContext(noteContext);

  let { deleteNote } = context;

  const handelonupdate = (newNote) => {
    props.clickModal.current.click();
    props.setNewnote({
      title: newNote.title,
      description: newNote.description,
      id: newNote._id,
    });
    console.log(newNote);
  };

  return (
    <div className="col-sm-6 my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-2xl font-bold">{title}</h5>
          <p className="card-text">
          {description}
          </p>
       <div className="mt-3 flex justify-between"> 
      <button
        type="button"
        onClick={() => handelonupdate(props.note)}
        className=" m-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => deleteNote(_id)}
        className=" m-2 inline-block  px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Delete
      </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Notecomponents;
