import { globalError } from "../../middleware/globalErrorHandling.js"
import { AppError } from "../../utils/AppError.js"
import authRouter from "../auth/auth.routes.js"
import authorRouter from "../author/author.routes.js"
import bookRouter from "../book/book.routes.js"
import historyRouter from "../history/history.routes.js"
import languageRouter from "../language/language.routes.js"
import reviewRouter from "../review/review.routes.js"
import userRouter from "../user/user.routes.js"
import imageRouter from "../user_Image/image.routes.js"
import wishlistRouter from "../wishlist/wishlist.routes.js"
import genreRouter from "./genre.routes.js"


export const bootstrap=(app)=>{

    app.use("/api/v1/genre",genreRouter)
    app.use("/api/v1/book",bookRouter)
    app.use("/api/v1/user",userRouter)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/review",reviewRouter)
    app.use("/api/v1/wishlist",wishlistRouter)
    app.use("/api/v1/author",authorRouter),
    app.use("/api/v1/userImage",imageRouter),
    app.use("/api/v1/history",historyRouter),
    app.use("/api/v1/language",languageRouter),











    
    app.use('*', (req, res, next) => {
        next(new AppError("not found endPoint", 400))
    })
    
    app.use(globalError)
}