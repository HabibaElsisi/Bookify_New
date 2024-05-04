import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim:true,
    },
    brief:{
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short Book brief'],
        maxLength:[500,"too long Book brief"]
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    image:String
},{timestamps:true,toJSON:{virtuals:true}});

schema.virtual("mybooks",{
    localField:"_id",
    foreignField:"author",
    ref:"book"
})
// schema.post("init",function(doc){
//     if(doc.image){
//     doc.image=process.env.baseURL +"uploads/"+ doc.image
//     }
// })
// schema.post("save",function(){
//     this.image=process.env.baseURL +"uploads/"+ this.image
// })
// schema.post("findOneAndUpdate",function(){
//     this._update.image=process.env.baseURL +"uploads/"+ this._update.image
// })
export const authorModel = mongoose.model('author', schema)
