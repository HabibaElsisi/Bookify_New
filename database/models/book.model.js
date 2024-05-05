import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'this Book title already exists'],
        trim: true,
        required: [true, "Book title is required"],
        minLength: [2, 'too short Book title'],
        maxLength:[200,"too long Book title"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short Book description'],
        maxLength:[500,"too long Book description"]
    },
    imgCover:String,
    bookContent: {
        type: String,
        required: [true, "Book content is required"],
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:{
        type:Number,
        min:0,
        default:0
    },
    genre:{
        type:mongoose.Types.ObjectId,
        ref:"genre"
    },
    language:{
        type:mongoose.Types.ObjectId,
        ref:"language"

    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"author"
    },
    priority:{
        type:Number
    }

}, {timestamps:true,toJSON:{virtuals:true}})
// schema.post("init",function(doc){
//     if(doc.imgCover){
//     doc.imgCover=process.env.baseURL+"uploads/"+ doc.imgCover
//     }
// })
// schema.post("save",function(){
//     this.imgCover=process.env.baseURL+"uploads/"+ this.imgCover
// })

schema.virtual("myReviews",{
    ref:"review",
    localField:"_id",//id of product model here
    foreignField:"book"//bookId in review model
});

schema.pre("findOne",function(){
    this.populate({path: 'myReviews',
    select: 'text rate createdAt -_id'})
})


export const bookModel = mongoose.model('book', schema)






