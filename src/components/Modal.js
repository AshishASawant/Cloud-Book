import React from 'react'

const Modal = () => {

    function handelonchange() {
        
    }
    function handelonsubmit() {
        
    }
  return (
    <>
    {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <form onSubmit={handelonsubmit} className="flex space-y-5 flex-col justify-center items-center mb-4">
            <input onChange={handelonchange} type="text" name="title" id="title" placeholder="Title" className="w-2/3 border border-2 border-slate-400 rounded-md p-2 mt-4 text-xl" required autoFocus/>
            <textarea onChange={handelonchange} name="description" id="description" cols="30" rows="10" placeholder="Decription" className="w-2/3 border-4 border-slate-400 rounded-md p-2 mt-2 text-xl" required></textarea>
            <button type="submit" className="m-3 text-xl bg-white w-2/3 bg-blue-800 border border-2 border-slate-400 rounded-md p-2 ">Add Note</button>
        </form>
  </div>
  </div>
</div>
    </>
  )
}

export default Modal