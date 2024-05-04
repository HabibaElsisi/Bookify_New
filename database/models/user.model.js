import mongoose from "mongoose"
import bcrypt from "bcrypt"
const Schema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:{
        type:Number,
        min:[10,"too short age"],
        max:[80,"too long age"]

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    verifyEmail:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    forgetCode:{
        type:Number
    },
    image:String,
    passwordChangedAt:Date,
    loggedTimeAt:Date,
    wishlist:[{
        type:mongoose.Types.ObjectId,
        ref:"book"
    }],
    // status: {
    //     type: String,
    //     enum: ["not_read", "reading", "read"],
    //     default: "not_read"
    // }

},{timestamps:true})

Schema.pre("save",function(){
        this.password=bcrypt.hashSync(this.password,8) 
})

Schema.post("findOneAndUpdate",function(){
  if(this._update.password){
    this._update.password=bcrypt.hashSync(this._update.password,8)
    
  }
//   if(this._update.image){
//     this._update.image=process.env.baseURL +"uploads/"+ this._update.image
//   }
})
// Schema.post("init",function(doc){
//     if(doc.image){
//     doc.image=process.env.baseURL +"uploads/"+ doc.image
//     }
// })

export const userModel = mongoose.model("user", Schema);

