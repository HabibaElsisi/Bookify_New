import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'this Genre name already exists'],
        trim: true,
        required: [true, "Genre name is required"],
        minLength: [2, 'too short Genre name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true })
schema.post("init",function(){
    if(this.image){
    this.image=process.env.baseURL +"uploads/"+ this.image
    }
})

schema.post("save",function(){
    this.image=process.env.baseURL +"uploads/"+ this.image
})

export const genreModel = mongoose.model('genre', schema)



