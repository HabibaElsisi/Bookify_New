// import { historyModel } from "../../database/models/history.model.js"
// import { userModel } from "../../database/models/user.model.js"

// export const userStatus=async(req,res,next)=>{
//     let userStatus=await userModel.findById(req.user._id)
//     if(userStatus.status=="not_read"){
//         await historyModel.create({userId:req.user._id,action:"user did not read this book",bookId:req.params.id})
//     }
//     if(userStatus.status=="reading"){
//         await historyModel.create({userId:req.user._id,action:"user is reading this book",bookId:req.params.id})
//     }
//     if(userStatus.status=="read"){
//         await historyModel.create({userId:req.user._id,action:"user  read this book",bookId:req.params.id})
//     }
//     next()
// }