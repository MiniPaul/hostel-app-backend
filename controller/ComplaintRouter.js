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

router.get("/viewall",async(req,res)=>{
    let result=await complaintModel.find()
    .populate("UserID","name email -_id")
    .exec()
    res.json(result)
})

router.post("/viewmycomplaint",async(req,res)=>{
    let input=req.body
    let data=await complaintModel.find(input)
    res.json(data)
})



module.exports=router