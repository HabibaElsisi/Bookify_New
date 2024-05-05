import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addLanguageVal, paramsIdVal } from "./language.validation.js"
import { addLanguage, deleteLanguage, getAllLanguages, getAllLanguageToSelect } from "./language.controller.js"
import bookRouter from "../book/book.routes.js"
let languageRouter=express.Router()
languageRouter.use("/:language/book",bookRouter)
languageRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),validation(addLanguageVal),addLanguage)
    .get(getAllLanguages)
languageRouter.get("/selectLanguage",getAllLanguageToSelect)
languageRouter.route("/:id")
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteLanguage)






export default languageRouter