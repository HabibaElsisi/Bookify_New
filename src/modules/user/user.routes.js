import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js"
import { isEmailExists } from "../../middleware/EmailExists.js"
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js"

let userRouter=express.Router()
userRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),validation(addUserVal),isEmailExists,addUser)
    .get(protectedRoutes,allowedTo("admin"),getAllUsers)
userRouter.route("/:id")
    .get(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),getSingleUser)
    .put(protectedRoutes,allowedTo("admin"),validation(updateUserVal),updateUser)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteUser)


export default(userRouter)