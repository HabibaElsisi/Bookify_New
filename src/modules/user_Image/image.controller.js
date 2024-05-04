import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
    cloud_name: 'dw0ah4b0d', 
    api_key: '113396713524483', 
    api_secret: '0IE803ol080f-DYFKmAiMtP9i3g' 
  });

const addImage=catchError(async(req,res,next)=>{
    await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
        req.body.image=result.secure_url
        let userImage=await userModel.findByIdAndUpdate(req.user._id,{image:req.body.image},{new:true})
    res.json({message:"image added successfully",userImage})
    
       });

})


const deleteImage=async(req,res,next)=>{
    await userModel.findByIdAndUpdate(req.user._id,{image:null},{new:true})
    res.json({message:"image deleted successfully"})
}

export {
    addImage,
    deleteImage
}