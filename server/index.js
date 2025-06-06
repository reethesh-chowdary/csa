const express = require("express");
const mongoose = require("mongoose") 
const path = require("path");
const app = express() 
const cors = require("cors");
app.use(cors());



app.use(express.json())

const dotenv = require("dotenv")
dotenv.config()

const {courseRouter} = require("./routes/courses.js")
const {userRouter} = require("./routes/user.js")
const {adminRouter} = require("./routes/admin.js")


  
app.use("/user",userRouter);
app.use("/courses",courseRouter)
app.use("/admin",adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)

    app.listen(process.env.PORT,()=>{
        console.log("server is running on Port ",process.env.PORT)
    })
};

main();