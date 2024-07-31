import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'
// import toastify
import {ToastContainer,Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

let nav = useNavigate();

const [fullname,setFullname] = useState([]);
const [email,setEmail] = useState([]);
const [password,setPassword] = useState([]);

// toast
const userexist =() => toast.error('Email ID already exist', {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
  });

// signup
async function signup() {
  try {
    let signup = await axios.post('http://localhost:3001/signup',{fullname,email,password});
    let signuptoken= signup.data.token;
    let username= signup.data.username;
    sessionStorage.setItem('token', signuptoken);
    sessionStorage.setItem('username', username);
    let signupstatus = signup.data.message;
    if(signupstatus==="user aready exist"){
      userexist();
    }
    else{
      nav('/Todo');
    }
  } catch (error) {
    console.log(error.message);
  }
}
  return (
    <>
    <div className='background d-flex flex-column justify-content-center align-items-center'>
      <h2 className=''>TODO APP</h2>
    </div>
    <div className="container d-flex flex-column justify-content-center align-items-center signupformcontainer">
      <form className="signupform px-5 py-4" onSubmit={(e)=>{e.preventDefault(); signup();}}>
        <h3 className='ms-2 mb-3 text-center'>Sign-up</h3>
        <div className="mb-3 form-floating">
          <input type="text" className="form-control shadow-none" id="floatingfullname" placeholder='Fullname' onChange={(e)=>setFullname(e.target.value)}/>
          <label htmlFor="floatingfullname" className="form-label">Fullname</label>
        </div>
        <div className="mb-3 form-floating">
          <input type="email" className="form-control shadow-none" id="floatingemail" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor="floatingemail" className="form-label">Email address</label>
        </div>
        <div className="mb-3 form-floating">
          <input type="password" className="form-control shadow-none" id="floatingpassword1" placeholder='Create password'/>
          <label htmlFor="floatingpassword1" className="form-label">Create password</label>
        </div>
        <div className="mb-3 form-floating">
          <input type="password" className="form-control shadow-none" id="floatingpassword2" placeholder='Re-enter password' onChange={(e)=>setPassword(e.target.value)}/>
          <label htmlFor="floatingpassword2" className="form-label">Re-enter password</label>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="button" className="btn btn-dark ms-2 signupbtn border-0" onClick={signup}>Sign-up</button>
        </div>
        <div className="my-3 d-flex flex-column justify-content-center">
            <p className="m-0 signuptext text-center">Already have Account ?<button className="btn btn-sm signbtn" onClick={()=>nav('/')}>Log in</button></p>
        </div>
     </form> 
   </div>
   <ToastContainer />
    </>
  )
}

export default Signup
