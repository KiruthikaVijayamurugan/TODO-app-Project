import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forgetpassword.css';
// import toastify
import {ToastContainer,Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgetpassword = () => {

let nav = useNavigate();

const [email,setEmail]= useState('');
// toast
const usernotexist =() => toast.error('Email ID does not exist', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
  });

// forget password
async function forgetpassword() {
  try {
    let forgetpassword = await axios.post('http://localhost:3001/forgetpassword',{email});
    let forgetpasswordstatus = forgetpassword.data.message;
    if(forgetpasswordstatus==="Email id doesn't exist"){
      return usernotexist();
    }
    else if(forgetpasswordstatus==="Email id exist"){
      let jwt = forgetpassword.data.token;
      sessionStorage.setItem("jwtoken",jwt);
      nav('/resetpassword');
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
    <div className="container d-flex flex-column justify-content-center align-items-center fgpassformcontainer">
  <form className='loginform px-5 py-5' onSubmit={(e) => {e.preventDefault();forgetpassword();}}>
  <h3 className='ms-2 mb-4 text-center'>Forget password</h3>
  <div className="form-floating">
    <input type="email" className="form-control shadow-none" id="floatingInput" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)}/>
    <label htmlFor="floatingInput" className="form-label">Email address</label>
  </div>
  <div className='d-flex justify-content-center my-3'>
  <button type="button" className="btn btn-dark ms-2 loginbtn border-0" onClick={forgetpassword}>Continue</button>
  </div>
  <div className="my-3 d-flex flex-column justify-content-center">
    <p className="m-0 signuptext text-center">Back to login?<button className="btn btn-sm signbtn" onClick={()=>nav('/')}>Login</button></p>
</div>
</form>
</div>
<ToastContainer />
    </>
  )
}

export default Forgetpassword
