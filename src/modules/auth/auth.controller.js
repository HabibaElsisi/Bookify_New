

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { catchError } from "../../middleware/catchError.js"

import { AppError } from "../../utils/AppError.js"
import { sendEmail } from "../../services/email/sendEmail.js"
import { userModel } from "../../../database/models/user.model.js"
import Randomstring from "randomstring"
import { sendOTPEmail } from "../../services/OTPCode/sendOTP_InEmail.js"
import { statusModel } from "../../../database/models/status.model.js"
import { historyModel } from "../../../database/models/history.model.js"
const signUp=catchError(async(req,res,next)=>{
    let user=new userModel(req.body)
    await user.save()
    //  await  sendEmail(req.body.email,req.body.name)
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"signUp successfully",token})
})

const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        //  if(!user.verifyEmail){
        //      await sendEmail(user.email,user.name)
        //      return  next(new AppError(`verify email first ..check your gmail`,401))
             
        //      }
            let token = jwt.sign({ userId: user._id,role:user.role },process.env.JWT_KEY)
            let role=user.role
            await userModel.findOneAndUpdate({email:req.body.email},{isActive:true})
        return res.json({ message: "login Successfully", token ,role})
    }

    return res.json({ message: "incorrect email or password " })
})

const verify = catchError(async (req, res) => {
    jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) return res.json(err)
        await userModel.findOneAndUpdate({ email: decoded.email }, { verifyEmail: true })
        res.json({ message: "success" })
    })

})


const changePassword=async(req,res,next)=>{

    let user=await userModel.findById(req.user._id)
    if(!user) return next(new AppError(`this user not fount`,404))
    if(!bcrypt.compareSync(req.body.oldPassword,user.password)) {
        return next(new AppError(`wrong password`,404))
    }
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    let hashPass=bcrypt.hashSync(req.body.newPassword,8)
    await userModel.findByIdAndUpdate(req.user._id,{password:hashPass,passwordChangedAt:Date.now()},{new:true})
    res.json({message:"Password changed successfully",token})

}

const logout=catchError(async(req,res,next)=>{

    await userModel.findByIdAndUpdate(req.user._id,{isActive:false,loggedTimeAt:Date.now()},{new:true})
    res.json({message:"logOut successfully"})


})

const deleteAccount=async(req,res,next)=>{
    await userModel.findByIdAndUpdate(req.user._id,{isActive:false},{new:true})
    res.json({message:"your account deleted successfully"})
}

const forgetPassword=catchError(async(req,res,next)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(!user)return next(new AppError(`this email not found`,404))
    const forgetCode=Randomstring.generate({
    charset:"numeric",
    length:5
})
sendOTPEmail(user.email,forgetCode)
    await  userModel.findOneAndUpdate({email:req.body.email},{forgetCode})
    return res.json({message: "your OTP generated successfully...check your email"})

})


const resetPassword=catchError(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})
    if(!user) return next(new AppError(`this email not found`,404))
    if(!(user.forgetCode==req.body.forgetCode))return next(new AppError(`check your forget Code again it is invalid`))
    let hashPass=bcrypt.hashSync(req.body.password,8)
    await userModel.findOneAndUpdate({email:req.body.email},{password:hashPass,passwordChangedAt:Date.now()},{new:true})
    res.json({message:"your password has changed"})
}
)


const updateInfo=catchError(async(req,res,next)=>{
    if(req.body.email){
        let isEmailExists=await userModel.findOne({email:req.body.email,_id:{$ne:req.user._id}})
        if(isEmailExists)return next(new AppError(`this email already exists use anthor one`,404))
    }
   let updateInfo= await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    res.status(200).json({message:"your  info updated successfully",updateInfo})

})
// const updateStatus=catchError(async(req,res,next)=>{
//     await userModel.findByIdAndUpdate(req.user._id,{status:req.body.status},{new:true})
//     res.json({message:"your status updated successfully"})
// })


const updateStatus=async(req,res,next)=>{
    let isExist= await statusModel.find({user:req.user._id,book:req.params.id})
    if(isExist.length>0){
        await statusModel.findOneAndUpdate({book:req.params.id,user:req.user._id},{status:req.body.status},{new:true})
    }
    else{
        let status=new statusModel({status:req.body.status,user:req.user._id,book:req.params.id})
        await status.save() 
    }
    
    await userModel.findByIdAndUpdate({_id:req.user._id},{status:req.body.status},{new:true})
    let history = new historyModel({
        userId: req.user._id,
        action: req.body.status,
        bookId: req.params.id
    });
    await history.save();
    res.json({message:"your status updated successfully"})
}

const getInfo=catchError(async(req,res,next)=>{
    let user=await userModel.findById(req.user._id)
    let userId=user.id
    let userName=user.name
    let userEmail=user.email
    let userAge=user.age
    res.json({message:"this is your info",userId,userName,userEmail,userAge})
    
})






export{
    signUp,
    verify,
    signin,
    changePassword,
    logout,
    deleteAccount,
    forgetPassword,
    resetPassword,
    updateInfo,
    updateStatus,
    getInfo
}