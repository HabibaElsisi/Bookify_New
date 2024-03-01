import express from "express"
import { validation } from "../../middleware/validation.js"
import { addGenreVal, paramsIdVal, updateGenreVal } from "./genre.validation.js"
import { addGenre, deleteGenre, getAllGenres, getSingleGenre, updateGenre } from "./genre.controller.js"
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js"
import bookRouter from "../book/book.routes.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
let genreRouter=express.Router()
genreRouter.use("/:id/book",bookRouter)
genreRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),uploadSingleFile("img"),validation(addGenreVal),addGenre)
    .get(getAllGenres)

genreRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleGenre)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteGenre)
    .put(protectedRoutes,allowedTo("admin"),uploadSingleFile("img"),validation(updateGenreVal),updateGenre)


export default genreRouter