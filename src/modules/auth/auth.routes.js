import express from "express"
import { validation } from "../../middleware/validation.js"
import { changePasswordVal, forgetPasswordVal, resetPasswordVal, signUpVal, signinVal, updateInfoVal, updateStatusVal } from "./auth.validation.js"
import { changePassword, deleteAccount, forgetPassword, logout, resetPassword, signUp, signin, updateInfo, updateStatus, verify } from "./auth.controller.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { isEmailExists } from "../../middleware/EmailExists.js"

let authRouter=express.Router()
authRouter.post("/signUp",validation(signUpVal),isEmailExists,signUp)
authRouter.post("/signIn",validation(signinVal),signin)
authRouter.get('/verify/:token',verify)
authRouter.patch("/changePassword",protectedRoutes,allowedTo("user"),validation(changePasswordVal),changePassword)
authRouter.get("/logout",protectedRoutes,allowedTo("user"),logout)
authRouter.delete("/deleteAccount",protectedRoutes,allowedTo("user"),deleteAccount)
authRouter.patch("/forgetPassword",validation(forgetPasswordVal),forgetPassword)
authRouter.patch("/resetPassword",validation(resetPasswordVal),resetPassword)
authRouter.put("/updateInfo",protectedRoutes,allowedTo("user"),validation(updateInfoVal),updateInfo)
authRouter.patch("/updateStatus/:id",protectedRoutes,allowedTo("user"),validation(updateStatusVal),updateStatus)

export default authRouter