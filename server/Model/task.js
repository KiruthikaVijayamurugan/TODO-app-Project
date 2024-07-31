const mongoose = require('mongoose');
//  schema creation
const schema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    deleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default: new Date()
    },
    email:{
        type:String,
        required:true
    }
})
// model creation
let todotasklist = mongoose.model('Todotasklist',schema);
// exporting
module.exports = todotasklist;