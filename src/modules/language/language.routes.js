import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addLanguageVal, paramsIdVal } from "./language.validation.js"
import { addLanguage, deleteLanguage, getAllLanguages } from "./language.controller.js"
let languageRouter=express.Router()

languageRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),validation(addLanguageVal),addLanguage)
    .get(getAllLanguages)
languageRouter.route("/:id")
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteLanguage)






export default languageRouter