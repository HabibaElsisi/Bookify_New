import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { addImage, deleteImage } from "./image.controller.js"
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js"
import { validation } from "../../middleware/validation.js"
import { addImageVal } from "./image.validation.js"
let imageRouter=express.Router()

imageRouter.route("/")
    .patch(uploadSingleFile("image"),protectedRoutes,allowedTo("user"),validation(addImageVal),addImage)
imageRouter.patch("/deleteimage",protectedRoutes,allowedTo("user","admin"),deleteImage)




export default imageRouter