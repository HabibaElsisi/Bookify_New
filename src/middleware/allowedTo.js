import { AppError } from "../utils/AppError.js"

export const allowedTo=(...roles)=>{
    return async(req,res,next)=>{
       if(!roles.includes(req.user.role))return next(new AppError(`you are not authorized`,401))
       next()
    }

}