import express from "express"
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js"
import { validation } from "../../middleware/validation.js"
import { addAuthorVal, paramsIdVal, updateAuthorVal } from "./author.validation.js"
import { addAuthor, deleteAuthor, getAllAuthors, getSingleAuthor, updateAuthors } from "./author.controller.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
let authorRouter=express.Router()

authorRouter.route("/")
    .post(uploadSingleFile("image"),protectedRoutes,allowedTo("admin"),validation(addAuthorVal),addAuthor)
    .get(getAllAuthors)
authorRouter.route("/:id")
    .put(uploadSingleFile("image"),protectedRoutes,allowedTo("admin"),validation(updateAuthorVal),updateAuthors)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteAuthor)
    .get(validation(paramsIdVal),getSingleAuthor)




export default authorRouter