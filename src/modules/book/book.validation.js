import joi from "joi"


const addBookVal=joi.object({
    title:joi.string().trim().required().min(2).max(300),
    description:joi.string().trim().required().min(10).max(1500),

    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif").required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }).required(),
    bookContent:joi.string().uri().required(),
    genre:joi.string().hex().length(24).required(),
    language:joi.string().hex().length(24).required(),
    author:joi.string().hex().length(24).required(),
    createdBy:joi.string().hex().length(24).optional(),
    
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()

})

const updateBookVal=joi.object({
    id:joi.string().hex().length(24).required(),

    title:joi.string().trim().min(2).max(300),
    description:joi.string().trim().min(10).max(1500),

    image:joi.object({
        fieldname:joi.string(),
        originalname:joi.string(),
        encoding:joi.string(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif"),
        size:joi.number().max(5242880),
        destination:joi.string(),
        filename:joi.string(),
        path:joi.string()
    }),
    bookContent:joi.string().uri(),
    genre:joi.string().hex().length(24),
    author:joi.string().hex().length(24).optional(),
    language:joi.string().hex().length(24).optional(),
    createdBy:joi.string().hex().length(24).optional(),
})



export{
    addBookVal,
    paramsIdVal,
    updateBookVal
}