import mongoose from "mongoose"
const schema= new mongoose.Schema({
    languageName:{
        type:String,
        require:true,
    }
},{timestamps:true})
export const languageModel=mongoose.model("language",schema)