import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"

const addImage=catchError(async(req,res,next)=>{
    req.body.image=req.file.filename
    let userImage=await userModel.findByIdAndUpdate(req.user._id,{image:req.body.image},{new:true})
    res.json({message:"image added successfully",userImage})

})


const deleteImage=async(req,res,next)=>{

    await userModel.findByIdAndUpdate(req.user._id,{image:null},{new:true})
    res.json({message:"image deleted successfully"})


}

export {
    addImage,
    deleteImage
}