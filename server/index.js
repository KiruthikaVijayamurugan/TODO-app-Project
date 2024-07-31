const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./Model/task');
const User = require('./Model/user');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 3001;

// parsemiddleware

app.use(express.json());

// Cors middleware
app.use(cors());

// Connection to database

async function connectToDatabase() {
    try {
      const res = await mongoose.connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(res.connection.host);
    } catch (err) {
      console.log(err);
    }
  }
  
connectToDatabase();

// jwt verification middleware

let jwtmiddleware= (req,res,next)=>{
  try {
    let jwttoken = req.headers.authorization;
    console.log("jwttoken",jwttoken);
    if (!jwttoken) {
      return res.status(401).send({ message: "No token provided" });
    }
    let verified = jwt.verify(jwttoken,process.env.SECRET_KEY);
    console.log(verified)
    let emailid = verified.email;
    if(!verified){
      res.send({message:"Not authorized user"}).status(401);
      return;
    }
    // res.send({message:"Authorized user"}).status(200);
    next();    
  } catch (error) {
    next(error);
  }
}

let authorized =['/addtask','/gettask','/deletetask/:id','/updatetask/:id'];
app.use(authorized,jwtmiddleware);


// signup 

app.post('/signup', async (req,res,next)=>{
  try {
    let {fullname,email,password}= req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    let userfound = await User.findOne({email:email});
    console.log(userfound);
    if(!userfound) {
      let newuser = new User({fullname:fullname,email:email,password:hash});
      let saveuser = await newuser.save();
      let token = jwt.sign({email:email,username:fullname},process.env.SECRET_KEY);
      res.send({userdetails:saveuser,message:"usersaved",token:token,username:fullname}).status(200);
    }
    res.send({message:"user aready exist"}).status(400);
  } catch (error) {
    next(error);
  }
})

// login

app.post('/login',async(req,res,next)=>{
  try {
    let {email,password}= req.body;
    let userfound = await User.findOne({email:email});
    console.log(userfound);
    let username = userfound.fullname;
    if(!userfound) {
      return res.send({message:"Invalid user"}).status(400);
    }
    let hashpassword = userfound.password;
    let hashpasswordcheck = bcrypt.compareSync(password,hashpassword)
    if(!hashpasswordcheck) {
      res.send({message:"password is wrong"}).status(400);
    }
    let token = jwt.sign({email:email,username:username},process.env.SECRET_KEY);
    res.send({message:"Login successfull",token:token,username:username}).status(200);
  } catch (error) {
    next(error);
  }
})

// forget password

app.post('/forgetpassword',async(req,res,next)=>{
  try {
    let {email}= req.body;
    let userfound = await User.findOne({email:email});
    console.log(userfound);
    if(!userfound) {
      res.send({message:"Email id doesn't exist"}).status(400);
    }
    else{
      let token = jwt.sign({email:email},process.env.SECRET_KEY);
      res.send({message:"Email id exist",token:token}).status(200);
    }
  } catch (error) {
    next(error);
  }
})

// resetpassword

app.post('/resetpassword',async(req,res,next)=>{
  try {
    let jwttoken = req.headers.authorization;
    let verified = jwt.verify(jwttoken,process.env.SECRET_KEY);
    let {email} =verified;
    let {newpassword}= req.body;
    let salt = await bcrypt.genSaltSync(10);
    let newhash = await bcrypt.hashSync(newpassword,salt);
    let resetpassword = await User.updateOne({email:email},{$set:{password:newhash}});
    res.send({message:"Password reset successfully",resetpassword:resetpassword}).status(200);
  } catch (error) { 
    next(error)
  }
})

// call to add the task to database
app.post('/addtask', async (req, res,next) =>{
    try {
      let jwttoken = req.headers.authorization;
      let verified = jwt.verify(jwttoken,process.env.SECRET_KEY);
      let {email} =verified;
      let {task} =req.body;
      let newTask = new Task({task:task,email:email});
      let saveTask = await newTask.save();
      res.send({Task:saveTask,message:"tasksaved"}).status(200);
    } catch (error) {
        next(error);
    }
});

// call to fetch the task documents from collection
app.get('/gettask',async(req,res,next)=>{
    try {
      let jwttoken = req.headers.authorization;
      let verified = jwt.verify(jwttoken,process.env.SECRET_KEY);
      let {email} =verified;
      let tasklist = await Task.find({email:email}).sort({_id:-1});
      res.send({tasklist:tasklist,message:"tasklist displayed"});
    } catch (error) {
      next(error);
    }
});

// delete the task

app.delete('/deletetask/:id',async(req,res,next)=>{
  try {
    let id = req.params.id;
    let deletedtask = await Task.findByIdAndDelete(id);
    res.send({Deletedtask:deletedtask,message:"deleted successfully"}).status(200);
  } catch (error) {
    next(error);
  }
})

// update task

app.put('/updatetask/:id',async(req,res,next)=>{
  try {
    let id = req.params.id;
    let {task}=req.body;
      let updatedtask = await Task.findByIdAndUpdate({"_id":id},{$set:{task:task,date:new Date()}});
      res.send({message:"User updated",Updatedtask:updatedtask}).status(200);
  } catch (error) {
    next(error)
  }
})



// error handler middleware

let errorhandler_middleware = (err,req,res,next)=>{
    res.send({message:err.message??"Internal server error",status:err.statuscode??"500"}).status(err.statuscode??"500");
  }
app.use(errorhandler_middleware);

app.listen(port, () => 
    console.log(`TODO app server listening on port ${port}!`)
);