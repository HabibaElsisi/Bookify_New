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
app.post('/recommend', async (req, res) => {
    try {
        const { book_name } = req.body; // Extract the book_name from the request body
        if (!book_name) {
            return res.status(400).json({ error: 'Book name is required' });
        }

        // Call the fetchBookRecommendations function with the book_name
        const recommendedBooks = await fetchBookRecommendations(book_name);

        // Send the recommended books as the response
        res.json({ recommended_books: recommendedBooks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))