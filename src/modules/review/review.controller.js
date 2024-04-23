import { reviewModel } from "../../../database/models/review.model.js"
import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeature } from "../../utils/apiFeatures.js"


const addReview=catchError(async(req,res,next)=>{
    let userStatus=await userModel.findById(req.user._id)
    if(userStatus.status=="not_read"||userStatus.status=="reading")return next(new AppError(`you will not be able to add review finsh the book first`,404))
    req.body.user=req.user._id
    let isReviewExists=await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if(isReviewExists) return next (new AppError('you added review before on this book',404))
    let review=new reviewModel(req.body)
    await review.save()
    res.json({message:"Review added successfully",review})
})


const getAllReviews=catchError(async(req,res,next)=>{
    let filterObj={}
    if(req.params.id){
        filterObj.book=req.params.id
    }
    let apifeature=new ApiFeature(reviewModel.find(filterObj),req.query)
    .pagination().fields().filter().sort().search()
    let review=await apifeature.mongooseQuery
    res.json({message:"this is all reviews",page:apifeature.pageNumber,review})
})

const getSingleReview=catchError(async(req,res,next)=>{
    let review=await reviewModel.findById(req.params.id)
    if(!review)return next(new AppError(`this review not found`,404))
    res.json({message:"this is review",review})
})

const updateReview=catchError(async(req,res,next)=>{
    let review=await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    if(!review)return next(new AppError(`this review not found`,404))
    res.json({message:"review updated successfully",review})
})



const deleteReview = async (req, res, next) => {
      let review;
      if (req.user.role === "user") {
        review = await reviewModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      } else {
        review = await reviewModel.findByIdAndDelete(req.params.id);
      }
      if (!review) {
        return next(new AppError(`This review was not found`, 404));
      }
      res.status(200).json({ message: "Review deleted successfully", review });
  };
  



export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}
