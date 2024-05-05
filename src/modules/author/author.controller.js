import { authorModel } from "../../../database/models/author.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { deleteOne } from "../handlers/handle.js"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
    cloud_name: 'dw0ah4b0d', 
    api_key: '113396713524483', 
    api_secret: '0IE803ol080f-DYFKmAiMtP9i3g' 
  });


const addAuthor=catchError(async(req,res,next)=>{
let isAuthorExists=await authorModel.findOne({name:req.body.name})
if(isAuthorExists)return next(new AppError(`this author already exists`,404))
   req.body.addedBy=req.user._id
    await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
        req.body.image=result.secure_url
        let author= new authorModel(req.body)
    await author.save()
    res.json({message:"author added successfully",author})
       });
   })

const getAllAuthors=catchError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(authorModel.find(),req.query)
    .fields().filter().search().sort().pagination()
    let authors= await apiFeature.mongooseQuery
    if(authors.length==0)return next(new AppError(`there is no authors`,400))
    res.json({message:"this is all authors",page:apiFeature.pageNumber,authors})
})

const getAllAuthorsToSelect=catchError(async(req,res,next)=>{
    let authors=await authorModel.find().select("name brief _id") 
    res.json({message:"this is all authors",authors})

})

const updateAuthors=catchError(async(req,res,next)=>{
    let author= await authorModel.findById(req.params.id)
    if(!author) return next(new AppError("author not found",401))
   // if(!(req.user._id.toString()==author.addedBy.toString()))return next(new AppError(`you are not allowed to update this author`,401))
    if(req.file){
       await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
            req.body.image=result.secure_url
        
           });
    }
    if(req.body.name)
    {
        let isAuthorExists = await authorModel.findOne({ $and: [{ name: req.body.name }, { _id: { $ne: req.params.id } }] });
        if(isAuthorExists)return next(new AppError(`this author already exists`,404))
    }
    let updatedAuthor= await authorModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({message:"Author updated successfully",updatedAuthor})
}
)
const getSingleAuthor=catchError(async(req,res,next)=>{
    let author=await authorModel.findById(req.params.id).populate("mybooks")
    if(!author)return next (new AppError(`author not found`,404))
    res.json({message:"this is the author and all the books he made",author})
})

const deleteAuthor=deleteOne(authorModel)

export {
    addAuthor,
    getAllAuthors,
    updateAuthors,
    deleteAuthor,
    getSingleAuthor,
    getAllAuthorsToSelect
}