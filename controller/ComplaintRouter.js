const express=require("express")
const complaintModel=require("../Models/ComplaintModel")

const router=express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let complaint = new complaintModel(data)
    let result=await complaint.save()
    res.json({
        status:"success"
    })
})

module.exports=router