import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Resetpassword.css';
// import toastify
import {ToastContainer,Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpassword = () => {

let nav = useNavigate();
const [newpassword, setNewpassword] = useState("");

const reseterror =() => toast.error('Error', {
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

const resetsuccess = () => toast.success('Password reset Successfull !', {
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
    
async function resetpassword() {
    try {
      let resetpassword = await axios.post('http://localhost:3001/resetpassword',{newpassword},{headers:{Authorization:sessionStorage.getItem('jwtoken')}});
      let resetpasswordstatus = resetpassword.data.message;
      if(resetpasswordstatus!=="Password reset successfully"){
        return reseterror();
      }
      else{
        resetsuccess();
        nav('/');
        return;
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
    <div className="container d-flex flex-column justify-content-center align-items-center resetpassformcontainer">
  <form className='loginform px-5 py-5' onSubmit={(e) => {e.preventDefault();resetpassword();}}>
  <h3 className='ms-2 mb-4 text-center'>Reset password</h3>
  <div className="mb-2 form-floating">
    <input type="password" className="form-control shadow-none" id="floatingInput" placeholder='Create new password'/>
    <label htmlFor="floatingInput" className="form-label">Create new password</label>
  </div>
  <div className="mb-2 form-floating">
    <input type="password" className="form-control shadow-none" id="floatingInput" placeholder='Re-enter new password' onChange={(e)=>setNewpassword(e.target.value)}/>
    <label htmlFor="floatingInput" className="form-label">Re-enter new password</label>
  </div>
  <div className='d-flex justify-content-center my-3'>
  <button type="button" className="btn btn-dark ms-2 loginbtn border-0" onClick={resetpassword}>Reset</button>
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

export default Resetpassword
