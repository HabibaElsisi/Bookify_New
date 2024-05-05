
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { genreModel } from "../../../database/models/genre.model.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import {v2 as cloudinary} from 'cloudinary';     
cloudinary.config({ 
    cloud_name: 'dw0ah4b0d', 
    api_key: '113396713524483', 
    api_secret: '0IE803ol080f-DYFKmAiMtP9i3g' 
  });


const addGenre=catchError(async(req,res,next)=>{
    let isGenreExists=await genreModel.findOne({name:req.body.name})
    if(isGenreExists)return next(new AppError(`this Genre already exists`,404))
    req.body.slug=slugify(req.body.name)
    await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
        req.body.image=result.secure_url
        let genre=new genreModel(req.body)
        await genre.save()
        res.json({message:"Genre added successfully",genre})
    
    
       });
})

const getAllGenres=catchError(async(req,res,next)=>{
    let apiFeature=new ApiFeature(genreModel.find(),req.query)
    .fields().filter().pagination().search().sort()
    let genre = await apiFeature.mongooseQuery
    res.json({message:"this is all Genres",page:apiFeature.pageNumber,genre})

})
const getAllGenresToSelect=catchError(async(req,res,next)=>{
    let genres= await genreModel.find().select("name image _id")
    res.json({message:"this is all Genres",genres})

})
const getSingleGenre=catchError(async(req,res,next)=>{
    let genre= await genreModel.findById(req.params.id)
    if(!genre) return next(new AppError(`this genre not found`,404))
    res.json({message:"this is your specific Genre",genre})

})

const updateGenre=catchError(async(req,res,next)=>{
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
        let isGenreExists = await genreModel.findOne({ $and: [{ name: req.body.name }, { _id: { $ne: req.params.id } }] });
        if(isGenreExists)return next(new AppError(`this genre already exists`,404))
    }
     if(req.file){ 
         await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
            req.body.image=result.secure_url
           });
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
    deleteGenre,
    getAllGenresToSelect
}