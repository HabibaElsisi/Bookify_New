import joi from "joi"
const addLanguageVal=joi.object({
    language:joi.string().required().trim()
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})


export{
    addLanguageVal,
    paramsIdVal
}