

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { catchError } from "../../middleware/catchError.js"

import { AppError } from "../../utils/AppError.js"
import { sendEmail } from "../../services/email/sendEmail.js"
import { userModel } from "../../../database/models/user.model.js"
import Randomstring from "randomstring"
const signUp=catchError(async(req,res,next)=>{
    let user=new userModel(req.body)
    await user.save()
    sendEmail(req.body.email)
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"signUp successfully",token})
})

const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        if(!user.verifyEmail){
             sendEmail(user.email)
            return  next(new AppError(`verify email first`,401))
             
            }
            let token = jwt.sign({ userId: user._id,role:user.role },process.env.JWT_KEY)
            user.isActive=true
            await user.save()
        return res.json({ message: "login Successfully", token })
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
        return next(new AppError(`wrong password`))
    }
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)

    await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword,passwordChangedAt:Date.now()},{new:true})
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
    await  userModel.findOneAndUpdate({email:req.body.email},{forgetCode})
    return res.json({message: "your OTP generated successfully"})

})


const resetPassword=catchError(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})
    if(!user) return next(new AppError(`this email not found`,404))
    if(!(user.forgetCode==req.body.forgetCode))return next(new AppError(`check your forget Code again it is invalid`))
    await userModel.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword,passwordChangedAt:Date.now()},{new:true})
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
const updateStatus=catchError(async(req,res,next)=>{
    await userModel.findByIdAndUpdate(req.user._id,{status:req.body.status},{new:true})
    res.json({message:"your status updated successfully"})
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
    updateStatus
}