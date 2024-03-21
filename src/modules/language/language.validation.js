import joi from "joi"
const addLanguageVal=joi.object({
    laguage:joi.string().required().trim()
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})


export{
    addLanguageVal,
    paramsIdVal
}