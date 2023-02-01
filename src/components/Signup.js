import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert";


const Signup = () => {

  const [user, setUser] = useState({name:"",email:"",password:""})

  const handelonsubmit=async(e)=>{
    e.preventDefault()
    console.log(user)
    const data= await fetch('http://localhost:5000/api/users/signup',{method:'POST',headers:{
      'Content-Type': 'application/json'
    },body:JSON.stringify(user)})
    let json=await data.json()
    console.log(json)
    if(json.success){
      swal("User created", "", "success");
      navigate('/login')
    }
    else{
      swal(json.msg || json.errors[0].msg, "", "error");
    }
  }
  const handelonchange=async(e)=>{
    setUser({...user,[e.target.id]:e.target.value})
  }

    const navigate=useNavigate()
  return (
    <div className="mx-4 flex justify-center items-center flex-wrap g-6 text-gray-800">
      <div className="xl:w-10/12 ">
        <div className="block bg-white shadow-lg rounded-lg">
          <div className="lg:flex lg:flex-wrap g-0">
            <div className="lg:w-6/12 px-4 md:px-0">
              <div className="md:p-6 md:mx-6">
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="lotus.webp"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Welcome to cloudBook</h4>
                </div>
                <form onSubmit={handelonsubmit}>
                  <p className="mb-4">Please Register a new user</p>
                  <div className="mb-4">
                    <input
                      type="text"
                      onChange={handelonchange}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      onChange={handelonchange}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      onChange={handelonchange}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center pt-1 mb-12 pb-1">
                    <button
                      className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                      type="submit"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      style={{background:'linear-gradient( to right, #ee7724,#d8363a,#dd3675,#b44593)'}}
                    >
                      Sign up
                    </button>
                   
                  </div>
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2">Already have an account?</p>
                    <button
                      type="button"
                      className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={()=>{navigate('/login')}}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              style={{
                background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
              }}
            >
              <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                <h4 className="text-xl font-semibold mb-6">Cloudbook- Notes on the Cloud</h4>
                <p className="text-sm">
                 CloudBook is a note taking website that stores the data inside the cloud. It is a free to use app
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
