import mongoose from "mongoose";

const schema = new mongoose.Schema({
   text: {
        type: String,
        trim: true,
        minLength: [2, 'too short review']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"book"
    },
    rate:{
        type:Number,
        min:0,
        max:5
    },
    image: String
}, { timestamps: true })
schema.pre(/^find/,function(){
    console.log(this.populate("user","name"))
})


export const reviewModel = mongoose.model('review', schema)



