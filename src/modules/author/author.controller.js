import { authorModel } from "../../../database/models/author.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { deleteOne } from "../handlers/handle.js"

const addAuthor=catchError(async(req,res,next)=>{
    req.body.image=req.file.filename
   req.body.addedBy=req.user._id
    let author= new authorModel(req.body)
    await author.save()
    res.json({message:"author added successfully",author})
   })

const getAllAuthors=catchError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(authorModel.find(),req.query)
    .fields().filter().search().sort().pagination()
    let authors= await apiFeature.mongooseQuery
    if(authors.length==0)return next(new AppError(`there is no authors`,400))
    res.json({message:"this is all authors",page:apiFeature.pageNumber,authors})
})

const updateAuthors=catchError(async(req,res,next)=>{
    let author= await authorModel.findById(req.params.id)
    if(!author) return next(new AppError("author not found",401))
    if(!(req.user._id.toString()==author.addedBy.toString()))return next(new AppError(`you are not allowed to update this author`,401))
    if(req.file){
        req.body.image=req.file.filename
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
    getSingleAuthor
}