import { languageModel } from "../../../database/models/language.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { deleteOne } from "../handlers/handle.js"

const addLanguage=catchError(async(req,res,next)=>{
    let languageExists=await languageModel.findOne({language:req.body.language})
    if(languageExists) return next(new AppError(`this language exists`,404))
    let language= new languageModel(req.body)
    await language.save()
    res.json({message:"language addedd successfully",language})    
})

const getAllLanguages=catchError(async(req,res,next)=>{
    let apifeature=new ApiFeature(languageModel.find(),req.query).fields().filter().sort().pagination().search()
    let languages=await apifeature.mongooseQuery
    res.json({message:"this is all languages",languages,page:apifeature.pageNumber})
})

const getAllLanguageToSelect = catchError(async (req, res, next) => {
    let languages = await languageModel.find().select('language _id');
    res.json({ message: "These are all languages", languages });
});



const deleteLanguage=deleteOne(languageModel)

export {
    addLanguage,
    deleteLanguage,
    getAllLanguages,
    getAllLanguageToSelect
}
