import  mongoose  from "mongoose"

export const dbConnection= ()=>{
    mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.49gv7u0.mongodb.net/Bookify`)
    .then(()=>console.log("mongo Database connected successfully"))
    .catch((err)=>{
        console.log("Database connected error",err)
    })
}


//mongodb://127.0.0.1:27017/BookifyNew
