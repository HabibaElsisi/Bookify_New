import joi from "joi"
const addReviewVal=joi.object({

    text:joi.string().trim().required().min(1).max(200),
    book:joi.string().hex().length(24).required(),
    rate:joi.number().min(0).max(5).integer().required(),
})

const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const updateReviewVal=joi.object({
    id:joi.string().hex().length(24).required(),

    text:joi.string().trim().min(1).max(200),
    book:joi.string().hex().length(24),
    rate:joi.number().min(0).max(5).integer(),
    
})

export{
    addReviewVal,
    paramsIdVal,
    updateReviewVal
}