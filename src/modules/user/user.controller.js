
import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { deleteOne } from "../handlers/handle.js"



const addUser=catchError(async(req,res,next)=>{
    let user= new userModel(req.body)
    await user.save()
    res.json({message:"user added successfully",user:{name:user.name,email:user.email}})
})

const getAllUsers=catchError(async(req,res,next)=>{
    let apifeature=new ApiFeature(userModel.find(),req.query)
    .filter().search().sort().pagination().fields()
    let users=await apifeature.mongooseQuery
    res.json({message:"this is all users",paga:apifeature.pageNumber,users})

})


const getSingleUser=catchError(async(req,res,next)=>{
    let user=await userModel.findById(req.params.id)
    if(!user)return next(new AppError(`this user not found`,404))
    res.json({message:"this is user",user})

})


const updateUser=catchError(async(req,res,next)=>{
    let user=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!user) return next(new AppError(`this user not found`,404))
    res.json({message:"user updated successfully",user})
}
)

const deleteUser=deleteOne(userModel)

export {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}