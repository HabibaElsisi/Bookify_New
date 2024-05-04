import joi from "joi"

export const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})