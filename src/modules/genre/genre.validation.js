import joi from "joi"


const addGenreVal=joi.object({
    name:joi.string().trim().required().min(2).max(100),
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
    createdBy:joi.string().hex().length(24).optional()
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()

})
const updateGenreVal=joi.object({
    id:joi.string().hex().length(24).required(),

    name:joi.string().trim().min(2).max(100),
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



export{
    addGenreVal,
    paramsIdVal,
    updateGenreVal
}