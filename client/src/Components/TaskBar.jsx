import React, { useState ,useEffect} from 'react';
import './TaskBar.css';
import axios from 'axios';
const TaskBar = () => {
  // usestate
  const [task,setTask] = useState('');
  const [tasklist,setTasklist]=useState([]);
  const [edittask,setEdittask]=useState('');
  const [editTaskId, setEditTaskId] = useState('');
  console.log(tasklist);
// function to add task to DB
 async function posttask() {
  try {
    let Todotask = await axios.post('http://localhost:3001/addtask',{task},{headers:{Authorization:sessionStorage.getItem('token')}});
    console.log(Todotask);
    console.log(task);
    setTask('');
    gettask();
  } catch (error) {
    console.log(error);
  }
  }
  useEffect(()=>{
    gettask()
  },[])
  
  async function gettask() {
    try {
      let Todotasklist = await axios.get('http://localhost:3001/gettask',{headers:{Authorization:sessionStorage.getItem('token')}});
      console.log(Todotasklist);
      setTasklist(Todotasklist.data.tasklist)

    } catch (error) {
      console.log(error);
    }
    }
  // gettask();
  async function deletetask(_id){
    try {
      let deletedtask = await axios.delete(`http://localhost:3001/deletetask/${_id}`,{headers:{Authorization:sessionStorage.getItem('token')}});
      console.log(deletedtask);
      gettask();
    } catch (error) {
      console.log(error)
    }
  }
  async function updatetask() {
    try {
      let updatedtask = await axios.put(`http://localhost:3001/updatetask/${editTaskId}`, {task: edittask},{headers:{Authorization:sessionStorage.getItem('token')}});
      console.log(updatedtask);
      gettask();
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <div>
      <div className='Header'>
      <p className='headertext'>Welcome, {sessionStorage.getItem("username")}!</p>
      <div className='form'>
            <form onSubmit={(e) => {e.preventDefault();posttask();}}>
                  <input type='text' className='inputbox' placeholder='Create a New Todo' name="task" value={task} onChange={(e)=>setTask(e.target.value)}></input>
                  <button type="button" className='button' onClick={posttask}>Add to list</button>
            </form>
          </div>
    </div>
    <div className='Todoheading'>Todo List<img src="https://globalsymbols.com/uploads/production/image/imagefile/41068/83_41069_1ef98a4d-92bd-411a-9215-beaef7b92b93.svg" alt="writing img"/></div>
      
      <div className='Todolist'>
          {tasklist.map((task) => {
            return <div key={task._id} className='list'>
            <input type="checkbox" />
            <label>{task?.task}</label>
            <div className='icons'><i className="fa-solid fa-pen pen-icon" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setEdittask(task.task); setEditTaskId(task._id); }}></i></div>
            <div><i className="fa-solid fa-trash trash-icon" onClick={() => deletetask(task._id)}></i></div>
          </div>
          })}
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input value={edittask} onChange={(e)=>setEdittask(e.target.value)} className='form-control'/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary closebtn" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary updatebtn" onClick={updatetask} data-bs-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default TaskBar;
