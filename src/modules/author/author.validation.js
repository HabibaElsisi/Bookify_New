import joi from "joi"

const addAuthorVal=joi.object({
    name:joi.string().trim().required().min(2).max(50),
    brief:joi.string().trim().required().min(20).max(1500),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif").required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }).required()
})

const updateAuthorVal=joi.object({
    id:joi.string().hex().length(24).required(),
    name:joi.string().trim().min(2).max(50),
    brief:joi.string().trim().min(20).max(1500),
    image:joi.object({
        fieldname:joi.string(),
        originalname:joi.string(),
        encoding:joi.string(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif"),
        size:joi.number().max(5242880),
        destination:joi.string(),
        filename:joi.string(),
        path:joi.string()
    })

})

const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required(),
})



export {
    addAuthorVal,
    updateAuthorVal,
    paramsIdVal
}