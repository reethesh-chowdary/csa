const mongoose = require("mongoose") 

const Schema = mongoose.Schema 

const ObjectId = Schema.ObjectId 

const userSchema = new Schema({
    email : {type:String,unique:true}, 
    password : String, 
    firstname : String, 
    lastname : String 
}) 

const adminSchema = new Schema({
    email : {type:String,unique:true},
    password : String,
    firstname : String,
    lastname : String
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageURL : String,
    creatorid : {
        type: ObjectId, // or: mongoose.Schema.Types.ObjectId
        required: true,
        ref: 'Admin' // optional: if you have an Admin model
    }
})

const purchasesSchema = new Schema({
    courseId : ObjectId,
    userId :ObjectId
})

const UserModel = mongoose.model("users", userSchema) 
const  AdminModel = mongoose.model("admins",adminSchema)
const CourseModel = mongoose.model("courses",courseSchema) 
const PurchasesModel = mongoose.model("purchases",purchasesSchema)

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel
}