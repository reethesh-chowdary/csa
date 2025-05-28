
const express = require("express")
const { Router } = express
const { z } = require("zod")
const bcrypt = require("bcrypt");
const userRouter = Router()
const { UserModel, PurchasesModel, CourseModel } = require("../dbs")
const jwt = require("jsonwebtoken")
const { jwt_user_secret } = require("../config")
const { userAuth } = require("../middlewares/userMW")

userRouter.post("/signup", async function (req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100),
            firstname: z.string().min(3).max(100),
            lastname: z.string().min(3).max(100),
            password: z.string().min(3).max(30)
        })
        const parsedDataWithSuccess = requiredBody.safeParse(req.body)

        if (!parsedDataWithSuccess.success) {
            res.json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error
            })
            return
        }
        const { email, password, firstname, lastname } = req.body;

        const hashedPassword = await bcrypt.hash(password, 5)
        console.log(req.body)
        await UserModel.create({
            email,
            password: hashedPassword,
            firstname,
            lastname
        })
        res.json({
            message: "You are Successfully Signed Up"
        })
    } catch (err) {
        res.json({
            error: "fuck life"
        })
    }
})

userRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    });
    console.log(user)
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (user && passwordMatch) {
        const token = jwt.sign({
            userid: user._id.toString()
        }, jwt_user_secret)

        res.json({
            token
        })

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
})


userRouter.get("/purchases", userAuth, async function (req, res) {

    const userId = req.userid;

    // Step 1: Get all purchases by this user
    const purchases = await PurchasesModel.find({ userId });



    // console.log(purchases)

    // Step 2: Loop through each purchase and get the course
    const courseIds = purchases.map(p => p.courseId);
    const courses = await CourseModel.find({ _id: { $in: courseIds } });
    console.log(courses)
    res.json({
        allCourses: courses
    });
})


module.exports = {
    userRouter: userRouter
}