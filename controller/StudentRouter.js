const express = require("express")

const hostelmodel=require("../Models/StudentModel")

const router = express.Router()

const bcrypt =require("bcryptjs")

hashedpasswordGenerator=async(pass)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/addstud",async(req,res)=>{
 
    let{data} = {"data":req.body}
    let password = data.password

    const hashedpassword = await hashedpasswordGenerator(password)
    data.password = hashedpassword
    let student = new hostelmodel(data)
    let result = await student.save()
    res.json({
        "status":"success"
    })
})


router.get("/view",async(req,res)=>{
    let data = await hostelmodel.find()
    res.json(data)
})



module.exports=router