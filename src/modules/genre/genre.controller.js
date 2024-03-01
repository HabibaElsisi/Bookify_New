
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { genreModel } from "../../../database/models/genre.model.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeatures.js"


const addGenre=catchError(async(req,res,next)=>{
    let isGenreExists=await genreModel.findOne({name:req.body.name})
    if(isGenreExists)return next(new AppError(`this Genre already exists`,404))
    req.body.image=req.file.filename
    req.body.slug=slugify(req.body.name)
    let genre=new genreModel(req.body)
    await genre.save()
    res.json({message:"Genre added successfully",genre})
})

const getAllGenres=catchError(async(req,res,next)=>{
    let apiFeature=new ApiFeature(genreModel.find(),req.query)
    .fields().filter().pagination().search().sort()
    let genre = await apiFeature.mongooseQuery
    res.json({message:"this is all Genres",page:apiFeature.pageNumber,genre})

})
const getSingleGenre=catchError(async(req,res,next)=>{
    let genre= await genreModel.findById(req.params.id)
    if(!genre) return next(new AppError(`this genre not found`,404))
    res.json({message:"this is your specific Genre",genre})

})

const updateGenre=catchError(async(req,res,next)=>{
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
     if(req.file){ 
        req.body.image=req.file.filename
     }

   
    let genre= await genreModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!genre) return next(new AppError(`this catergory not found `,404))
   
    res.json({message:"Genre updated successfully",genre})
})

const deleteGenre=deleteOne(genreModel)


export {
    addGenre,
    getAllGenres,
    getSingleGenre,
    updateGenre,
    deleteGenre
}