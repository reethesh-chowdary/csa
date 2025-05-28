const express = require("express")
const {Router} = express 
const {z} = require("zod")
const adminRouter = Router()
const bcrypt = require("bcrypt")

const {AdminModel,CourseModel} = require("../dbs")
const jwt = require("jsonwebtoken")
const {jwt_admin_secret} = require("../config")
const {adminAuth} = require("../middlewares/adminMW")
adminRouter.post("/signup",async function(req,res){
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100),
            firstname: z.string().min(3).max(100),
            lastname: z.string().min(3).max(100),
            password: z.string().min(3).max(30)
        })
        const parsedDataWithSuccess = requiredBody.safeParse(req.body)
    
        if(!parsedDataWithSuccess.success){
            res.json({
                message:"Incorrect format",
                error:parsedDataWithSuccess.error
            })
            return
        }
    const {email,password,firstname,lastname} = req.body; 

    const hashedPassword = await bcrypt.hash(password,5)

    await AdminModel.create({
        email,
        password:hashedPassword,
        firstname,
        lastname
    })
    res.json({
        message:"You are Successfully Signed Up"
    })
    }catch(err){
        res.json({
            error:"fuck life"
        })
    }
})

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
        return res.status(403).json({
            message: "Admin not found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign({ creatorid: admin._id.toString() }, jwt_admin_secret);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});


adminRouter.post("/addcourse",adminAuth,async function(req,res){
    try{
    const creatorid = req.adminid
    const {title,description,price,imageURL} = req.body 

    const course = await CourseModel.create({
        title,
        description,
        price,
        imageURL,
        creatorid : creatorid
    })
    console.log(course)
    res.json({
        course
    
    })
}catch(err){
    res.json({
        message:"something went wrong",
        error: err
    })
}

})

adminRouter.get("/editcourse",adminAuth,async function(req,res){
    const courseid = req.query.courseId
    const creatorid = req.adminid
    const course = await CourseModel.findOne({
        _id:courseid,
        creatorid: creatorid
    })
    res.json({
        course
    })
})

adminRouter.put("/updatecourse",adminAuth,async function(req,res){
    const courseid = req.query.courseId
    const creatorid = req.adminid
    const {title,description,price,imageURL} = req.body 

    const course = await CourseModel.updateOne({
        _id:courseid,
        creatorid:creatorid
    },{
        title,
        description,
        price,
        imageURL
    })
    if (course.modifiedCount > 0){
        res.json({
            message:"Course Updated Successfully"
        })
    }else{
        res.json({
            message:"Something Went Wrong"
        })
    }
});

adminRouter.get("/courses",adminAuth,async function(req,res){
     
    const courses = await CourseModel.find({
        
    })
    if (courses){
        res.json(courses)
    }else{
        res.json({
            message:"Something Went Wrong!!!!"
        })
    }
})

adminRouter.get("/course/bulk",adminAuth,async function(req,res){
    const creatorid = req.adminid 
    const courses = await CourseModel.find({
        creatorid
    })
    if (courses){
        res.json({courses})
    }else{
        res.json({
            message:"Something Went Wrong!!!!"
        })
    }
})
adminRouter.delete("/deletecourse",adminAuth,async function(req,res){
    const courseid = req.query.courseId
    const creatorid = req.adminid
    const course = await CourseModel.deleteOne({
        _id:courseid,
        creatorid
    })
    if (course.deletedCount > 0){
        res.json({
            message:"Course Deleted Successfully"
        })
    }else{
        res.json({
            message:"Something Went Wrong"
        })
    }
})



module.exports = {
    adminRouter:adminRouter
}