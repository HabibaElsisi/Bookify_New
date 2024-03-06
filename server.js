process.on('uncaughtException',(err)=>{
    console.log('error',err);
})
import dotenv from "dotenv"
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from "./src/modules/genre/index.route.js";
import schedule from "node-schedule"
import { userModel } from "./database/models/user.model.js";
import cors from "cors"
dotenv.config()
const app = express()
const port = 3000
dbConnection()
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
bootstrap(app)
const cron=()=>{
    schedule.scheduleJob("1 1 1 * * 1",async function(){
        
        const date= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const users = await userModel.find({ verifyEmail: false, createdAt: { $lte: date } });
        const ids=[];
        users.map(item=>{
            ids.push(item._id)
        })
        
        
         await userModel.deleteMany({_id:{$in:ids}});
    });
}
cron()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))