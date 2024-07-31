const mongoose = require('mongoose');
//  schema creation
const schema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: new Date()
    }
})
// model creation
let userlist = mongoose.model('todousers',schema);
// exporting
module.exports = userlist;