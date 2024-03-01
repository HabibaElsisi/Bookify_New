import joi from "joi"
const addUserVal=joi.object({

    name:joi.string().trim().required().min(2).max(30),
    email:joi.string().required().trim().email(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    repassword:joi.valid(joi.ref("password")).required(),   
    role:joi.string().valid("user","admin") 
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const updateUserVal=joi.object({
    id:joi.string().hex().length(24).required(),

    name:joi.string().trim().min(2).max(30),
    email:joi.string().trim().email(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).min(8),
    repassword:joi.valid(joi.ref("password")),  
    role:joi.string().valid("user","admin") 

})

export {
    addUserVal,
    paramsIdVal,
    updateUserVal
}