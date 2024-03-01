import multer from "multer"
import mongoose from "mongoose"
import { AppError } from "../../utils/AppError.js";

export const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, new mongoose.Types.ObjectId() + "-" + file.originalname);
        },
    });

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new AppError(`Images only`, 401), false);
        }
    }

    return multer({ storage, fileFilter });
};



export const uploadSingleFile=fieldName=>fileUpload().single(fieldName)
export const uploadArrayOfFiles=fieldName=>fileUpload().array(fieldName,10)
export const uploadFields= fields =>fileUpload().fields(fieldName)

