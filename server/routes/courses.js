const express = require("express")
const { Router } = express
const courseRouter = Router()
const { PurchasesModel, CourseModel } = require("../dbs")
const { userAuth } = require("../middlewares/userMW")
const mongoose = require('mongoose');

courseRouter.post("/purchase", userAuth, async function (req, res) {
    const courseId =  req.query.courseId;
    const userId =  req.userid
    const purchase = await PurchasesModel.create({
        userId,
        courseId
    })
    console.log(purchase)
    res.json({
        message: "Successfully Purchased"
    })

})

courseRouter.get("/", async function (req, res) {
    const courses = await CourseModel.find({})
    res.json(
        { courses }
    )
})



module.exports = {
    courseRouter: courseRouter
}