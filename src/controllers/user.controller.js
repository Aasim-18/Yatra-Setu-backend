import asyncHandler from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";



const registerUser = asyncHandler( async (req, res) => {

 const {fullName, username, email, password} = req.body
console.log(req.body)
 if( [fullName, email, username, password].some
((field) => field?.trim() === '')
) {
   throw new ApiError(400, "All fields are required")
 }

const existedUser = await User.findOne({

 $or: [{username}, {email}]
})

if (existedUser) {

throw new ApiError(400, "User already exist")
};

const user =  await User.create({
fullName,
email,
password,
username,
role: "user"
})

const userCreated = await User.findById(user._id).select(
"-password ");

if (!userCreated) {
throw new ApiError(500, "Somthing went wrong while creating user")
 }

return res.status(201).json(
 new ApiResponse(200, userCreated, 
 "User Registerd Succesfully"
))
});

const Userlogin = asyncHandler( async (req, res) => {

 const {email, password} = req.body

if (!email && !password) { 

 throw new ApiError(402, "All field are required")
 }

const user =  await User.findOne({

$or: [{email}]

})

if (!user) {
throw new ApiError(404, "User not found")
 }

const ispasswordCorrect = await  user.validatePassword(password)

if (!ispasswordCorrect) {
throw new ApiError(401, "incorrect password")
 }



 const logginUser = await User.findById(user._id).select("-password ");

const options = {

 httpOnly: true,
 secure: true
 }

return res
.status(200)
.json(
   new ApiResponse(200, { user: logginUser }, 
  "User loggin Successfully" ) 
 )


});

 export { registerUser, Userlogin }
