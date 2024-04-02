import mongoose from "mongoose"
const schema= new mongoose.Schema({
    language:{
        type:String,
        require:true,
    }
},{timestamps:true})
export const languageModel=mongoose.model("language",schema)