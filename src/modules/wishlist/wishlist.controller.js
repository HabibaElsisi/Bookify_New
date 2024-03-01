
import { bookModel } from "../../../database/models/book.model.js"
import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

const addToWishlist=catchError(async(req,res,next)=>{
    let book=await bookModel.findById(req.body.book)
    if(!book) return next(new AppError(`this book not found`,404))
    let wishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.book}},{new:true}).populate("wishlist")
    if(!wishlist)return next(new AppError(`this user not found`,404))
    res.json({message:"book added successfully to wishlist",wishlist:wishlist.wishlist})
})


const removeFromWishlist=catchError(async(req,res,next)=>{
    let book=await bookModel.findById(req.params.id)
    if(!book) return next(new AppError(`this book not found`,404))
    let wishlist=await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true}).populate("wishlist")
    if(!wishlist)return next(new AppError(`this user not found`,404))
    res.json({message:"book removed successfully from wishlist",wishlist:wishlist.wishlist})
})


const getLoggedUserWishlist=async(req,res,next)=>{
    let wishlist=await userModel.findById(req.user._id).populate("wishlist")
    if(!wishlist) return next(new AppError(`wishlist not found`,404))
    res.json({message:"this is your wishlist",wishlist:wishlist.wishlist})

}

export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}