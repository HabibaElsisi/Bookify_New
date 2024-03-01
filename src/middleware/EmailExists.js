
import { userModel } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const isEmailExists=async(req,res,next)=>{
    let isUserExists=await userModel.findOne({email:req.body.email})
    if(isUserExists) next(new AppError(`this email already exists`,404))
    next()
}