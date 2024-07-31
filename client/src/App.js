import './App.css';
import {Route,Routes} from 'react-router-dom';
import TaskBar from './Components/TaskBar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Forgetpassword from './Components/Forgetpassword';
import Resetpassword from './Components/Resetpassword';


function App() {
  return <>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/Todo' element={<TaskBar/>}/>
    <Route path='/forgetpassword' element={<Forgetpassword/>}/>
    <Route path='/resetpassword' element={<Resetpassword/>}/>
  </Routes>
  </>
}

export default App;
