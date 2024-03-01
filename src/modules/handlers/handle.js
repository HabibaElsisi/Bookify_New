
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

export const deleteOne=(model)=>{
    return catchError(async(req,res,next)=>{
        let document=await model.findByIdAndDelete(req.params.id)
        if(!document) return next(new AppError(`this document not found`,404))
        res.json({message:"document deleted successfully",document})
    
    })

}