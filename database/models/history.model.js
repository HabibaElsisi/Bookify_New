import mongoose from "mongoose"

let schema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    action:{
        type:String
    },
    bookId:{
        type:mongoose.Types.ObjectId,
        ref:"book"

    }
})

export const historyModel= mongoose.model("history",schema)