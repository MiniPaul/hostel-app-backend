const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema(
    {
        UserID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"hostel" 
        },
        complaint:{
            type:String,
            required:true
        },
        complaintDate:{
            type:Date,
            default:Date.now
        }
    }
)

module.exports=mongoose.model("complaint",complaintSchema)