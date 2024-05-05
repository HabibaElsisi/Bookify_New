
import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { genreModel } from "../../../database/models/genre.model.js"
import { bookModel } from "../../../database/models/book.model.js"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeatures.js"
import { authorModel } from "../../../database/models/author.model.js"

import { userModel } from "../../../database/models/user.model.js"
import { historyModel } from "../../../database/models/history.model.js"
import { reviewModel } from "../../../database/models/review.model.js"
import { fetchBookRecommendations } from "../../../fast.js"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
    cloud_name: 'dw0ah4b0d', 
    api_key: '113396713524483', 
    api_secret: '0IE803ol080f-DYFKmAiMtP9i3g' 
  });

const addBook=catchError(async(req,res,next)=>{
    let authorExists=await authorModel.findById(req.body.author)
    if(!authorExists)return next(new AppError(`this author not found`,404))
    let isGenreExists=await genreModel.findById(req.body.genre)
    if(!isGenreExists) return next(new AppError(`this genre not found`,404))
    let isBookExists=await bookModel.findOne({title:req.body.title})
    if(isBookExists)return next(new AppError(`this Book already exists`,404))

    
    // req.body.imgCover=req.file.filename
    req.body.slug=slugify(req.body.title)
   await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
    req.body.imgCover=result.secure_url
    let book=new bookModel(req.body)
    await book.save()
    res.json({message:"Book added successfully",book})

   });


   
   
})

const getAllBooks = catchError(async (req, res, next) => {
    let filterObj = {};
    if (req.params.id) {
        filterObj.genre = req.params.id;
    }
    if (req.params.language) {
        filterObj.language = req.params.language;
    }

    let apiFeature = new ApiFeature(bookModel.find(filterObj), req.query)
        .fields().filter().pagination().search().sort();
    
    let books = await apiFeature.mongooseQuery;

    let recommendedBooks = [];
    if (req.query.keyword) {
        let bookName = req.query.keyword;
        recommendedBooks = await fetchBookRecommendations(bookName);

        let recommendedBooksFromDB = await bookModel.find({ title: { $in: recommendedBooks.map(book => book.title) } });
        let booksNotInRecommended = books.filter(book => !recommendedBooks.map(recBook => recBook.title).includes(book.title));
        books = recommendedBooksFromDB.concat(booksNotInRecommended);
    }

    return res.json({ message: "These are all Books", page: apiFeature.pageNumber, books });
});




const getSingleBook=catchError(async(req,res,next)=>{
    let book= await bookModel.findById(req.params.id).populate({
        path: 'author',
        select: 'name brief -_id'
    });
    if(!book) return next(new AppError(`this Book not found`,404))
    let reviews= await reviewModel.find({book:req.params.id})
    if(!reviews)  res.json({message:"success",book})
    let rate = 0;
    for (let i = 0; i < reviews.length; i++) {
        rate =i+1
    }
    let rateMid=[]
    for (let i = 0; i < reviews.length; i++) {
        rateMid.push(reviews[i].rate)
        
    }
    let numberOfRate=0
    let rateMinValues=0
    for(let i=0; i<rateMid.length; i++){
        numberOfRate=i+1
        rateMinValues +=rateMid[i]
    }
    if(!numberOfRate==0){
        book.rateAvg=rateMinValues/numberOfRate

    }
   
    book.rateCount=rate
    res.json({message:"success",book})

})

const updateBook=catchError(async(req,res,next)=>{
    if(req.body.author){
        let author= await authorModel.findById(req.body.author)
        if(!author) return next(new AppError(`author not found`,404))
    }
    if(req.body.genre){
        let genre= await genreModel.findById(req.body.genre)
        if(!genre) return next(new AppError(`genre not found`,404))
    }
    if(req.body.title){
        req.body.slug=slugify(req.body.title)
        let isBookExists = await bookModel.findOne({ $and: [{ title: req.body.title }, { _id: { $ne: req.params.id } }] });
        if(isBookExists)return next(new AppError(`this book already exists`,404))
    }
    if(req.file){
       await cloudinary.uploader.upload(req.file.path,async (error, result) =>{
            req.body.imgCover=result.secure_url
           });
    }
        
    let book= await bookModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!book) return next(new AppError(`this Book not found `,404))
    if(req.body.genre){
    let isGenreExists=await genreModel.findById(req.body.genre)
    if(!isGenreExists) return next(new AppError(`this genre not found`,404))
    }
   
    res.json({message:"Book updated successfully",book})
})



const getLoggedInSingleBook=async(req,res,next)=>{

    let book= await bookModel.findById(req.params.id).populate({
        path: 'author',
        select: 'name brief -_id'
    });
    if(!book) return next(new AppError(`this Book not found`,404))
    let reviews= await reviewModel.find({book:req.params.id})
    if(!reviews)  res.json({message:"success",book})
    let rate = 0;
    for (let i = 0; i < reviews.length; i++) {
        rate =i+1
    }
    let rateMid=[]
    for (let i = 0; i < reviews.length; i++) {
        rateMid.push(reviews[i].rate)
        
    }
    let numberOfRate=0
    let rateMinValues=0
    for(let i=0; i<rateMid.length; i++){
        numberOfRate=i+1
        rateMinValues +=rateMid[i]
    }
    if(!numberOfRate==0){
        book.rateAvg=rateMinValues/numberOfRate

    }
   
    book.rateCount=rate
    res.json({message:"success",book})



}

const deleteBook=deleteOne(bookModel)


export {
    addBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    getLoggedInSingleBook,
    
}