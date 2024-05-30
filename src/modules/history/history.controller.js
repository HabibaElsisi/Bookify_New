import { historyModel } from "../../../database/models/history.model.js"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js"

const getAllHistory = catchError(async (req, res, next) => {
    let history = await historyModel.find({ userId: req.user._id }).populate({
        path: 'bookId',
        select: 'title description -_id'
    });
    if (!history || history.length === 0) {
        return next(new AppError('No history for you', 404));
    }
    return res.json({ message: 'This is your history', history });
});


const deleteBookfromHistory = catchError(async (req, res, next) => {
    let deleteBook = await historyModel.findOneAndDelete({ bookId: req.params.id, userId: req.user._id });
    if (!deleteBook) {
        return next(new AppError('This book not found in your history', 404));
    }
    res.json({ message: 'Book deleted successfully from your history' });
});


export{
    getAllHistory,
    deleteBookfromHistory
}