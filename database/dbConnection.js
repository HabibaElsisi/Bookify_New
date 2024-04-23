import  mongoose  from "mongoose"

export const dbConnection= ()=>{
    mongoose.connect(process.env.DB_ONLINE)
    .then(()=>console.log("mongo Database connected successfully"))
    .catch((err)=>{
        console.log("Database connected error",err)
    })
}


//mongodb://127.0.0.1:27017/BookifyNew

