import express from "express"
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js"
import { validation } from "../../middleware/validation.js"
import { addBookVal, paramsIdVal, updateBookVal } from "./book.validation.js"
import { addBook, deleteBook, getAllBooks, getLoggedInSingleBook, getSingleBook, updateBook } from "./book.controller.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import reviewRouter from "../review/review.routes.js"
import { userStatus } from "../../middleware/userStatus.js"

const bookRouter=express.Router({mergeParams:true})
bookRouter.use("/:id/review",reviewRouter)
bookRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),uploadSingleFile("imgCover"),validation(addBookVal),addBook)
    .get(getAllBooks)

bookRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleBook)
    .put(protectedRoutes,allowedTo("admin"),uploadSingleFile("imgCover"),validation(updateBookVal),updateBook)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteBook)
// bookRouter.get("/getLoggedInSingleBook/:id",validation(paramsIdVal),protectedRoutes,allowedTo("user"),userStatus,getLoggedInSingleBook)

export default bookRouter