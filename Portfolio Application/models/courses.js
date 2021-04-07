const mongoose=require('mongoose');

const coursesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    service:{
        type:String,
        required:true,
    },
    client:{
        type:String,
        required:true,
    },
    projectUrl:{
        type:String,
        required:true,
    },
    mainimage:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    author: {
        type: String,
        required: true
    },
});
module.exports=mongoose.model('Courses',coursesSchema)