import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./review.controller.js"
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js"

let reviewRouter=express.Router({mergeParams:true})

reviewRouter.route("/")
    .post(protectedRoutes,allowedTo("user"),validation(addReviewVal),addReview)
    .get(getAllReviews)
reviewRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleReview)
    .put(protectedRoutes,allowedTo("user"),validation(updateReviewVal),updateReview)
    .delete(protectedRoutes,allowedTo("admin","user"),validation(paramsIdVal),deleteReview)



export default reviewRouter