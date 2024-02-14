const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const hostelrouter = require("./controller/StudentRouter")
const complaintrouter = require("./controller/ComplaintRouter")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/hostel",hostelrouter)
app.use("/api/complaint",complaintrouter)

mongoose.connect("mongodb+srv://minipaul:minipaul@cluster0.isuura7.mongodb.net/newhostelDb?retryWrites=true&w=majority", 
{useNewUrlParser:true})

app.listen(3001,()=>{
    console.log("Server Running")
})