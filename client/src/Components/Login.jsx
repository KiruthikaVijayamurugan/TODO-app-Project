import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
// import toastify
import {ToastContainer,Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
let nav = useNavigate();
const [email,setEmail] = useState([]);
const [password,setPassword] = useState([]);

// toastify

const loginsuccess = () => toast.success('Login Successfull !', {
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

 const wrongpassword =() => toast.error('Invalid Password', {
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
  
  const wronguser =() => toast.error('Invalid Email address', {
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
// login
async function login() {
  try {
    let login = await axios.post('http://localhost:3001/login',{email,password});
    console.log(login);
    let logintoken= login.data.token;
    let username= login.data.username;
    sessionStorage.setItem('token', logintoken);
    sessionStorage.setItem('username', username);
    let loginstatus= login.data.message;
    if(loginstatus ==="Login successfull"){
      loginsuccess();
      nav('/Todo');
    }
    else if(loginstatus ==="password is wrong"){
      wrongpassword();
    }
    else {
      wronguser();
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
    <div className="container d-flex flex-column justify-content-center align-items-center formcontainer">
  <form className='loginform px-5 py-4' onSubmit={(e)=>{e.preventDefault(); login();}}>
  <h3 className='ms-2 mb-3 text-center'>Log-in</h3>
  <div className="mb-3 form-floating">
    <input type="email" className="form-control shadow-none" id="floatingInput" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)}/>
    <label htmlFor="floatingInput" className="form-label">Email address</label>
  </div>
  <div className="mb-3 form-floating">
    <input type="password" className="form-control shadow-none" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    <label htmlFor="floatingpassword" className="form-label">Password</label>
  </div>
  <div className="ms-2 mb-3 form-check">
    <input type="checkbox" className="form-check-input shadow-none remembercheck" id="remembercheck"/>
    <label className="form-check-label" htmlFor="remembercheck">Remember me</label>
  </div>
  <div className='d-flex justify-content-center'>
  <button type="button" className="btn btn-dark ms-2 loginbtn border-0" onClick={login}>Log-in</button>
  </div>
  <div className="my-3 d-flex flex-column justify-content-center">
    <button className='btn btn-sm forgetpassbtn' onClick={()=>nav('/forgetpassword')}>Forgetpassword</button>
    <p className="m-0 signuptext text-center">Don't have Account ?<button className="btn btn-sm signbtn" onClick={()=>nav('/signup')}>Signup</button></p>
</div>
</form>
</div>
<ToastContainer />
    </>
  )
}

export default Login
