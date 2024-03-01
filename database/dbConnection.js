import  mongoose  from "mongoose"

export const dbConnection= ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/BookifyNew")
    .then(()=>console.log("mongo Database connected successfully"))
    .catch((err)=>{
        console.log("Database connected error",err)
    })
}