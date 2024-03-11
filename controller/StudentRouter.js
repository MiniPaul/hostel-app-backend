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

router.post("/myprofile", async (req, res) => {
    try {
        let input = req.body;
        let data = await hostelmodel.findOne(input);
        if (!data) {
            throw new Error("User not found");
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        // Return the error message
        res.status(500).json({ error: error.message });
    }
});


router.get("/view",async(req,res)=>{
    let data = await hostelmodel.find()
    res.json(data)
})

router.post("/login",async(req,res)=>{
    let input = req.body
    let email=req.body.email
    let data =await hostelmodel.findOne({"email":email})
    if(!data){
        return res.json({
            "status":"Invalid User"
        })
    }
    console.log(data)
    let dbpassword=data.password
    let inputpassword=req.body.password
    console.log(dbpassword)
    console.log(inputpassword)
    const match=await bcrypt.compare(inputpassword,dbpassword)
    if(!match)
    {
        return res.json({
            "status":"Incorrect Password"
        })
    }
    
    res.json({
        "status":"success","userData":data
    })
})

router.post("/delete",async(req,res)=>{
    let input=req.body
    let response=await hostelmodel.deleteOne(input)
    res.json({
        "status":"success"
    })
})

module.exports=router