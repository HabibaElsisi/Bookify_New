import mongoose from "mongoose";

const schema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["not_read", "reading", "read"],
        default: "not_read"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"book"
    },
}, { timestamps: true })


export const statusModel = mongoose.model('status', schema)



