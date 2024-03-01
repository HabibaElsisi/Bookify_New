import joi from "joi"

const signUpVal=joi.object({
    name:joi.string().trim().required().min(2).max(30),
    email:joi.string().required().trim().email(),
    age:joi.number().required().min(10).max(80).integer(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    repassword:joi.valid(joi.ref("password")).required(),   
})



const signinVal=joi.object({
    email:joi.string().required().trim().email(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),

})
const changePasswordVal=joi.object({
    oldPassword:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    newPassword:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    reNewPassword:joi.valid(joi.ref("newPassword")).required(),   

})

const forgetPasswordVal=joi.object({
    email:joi.string().email().trim().required(),
})

const resetPasswordVal=joi.object({
    email:joi.string().email().required(),
    forgetCode:joi.string().length(5).required(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    repassword:joi.valid(joi.ref("password")).required(),   
})
const updateInfoVal=joi.object({
    name:joi.string().trim().min(2).max(30),
    email:joi.string().trim().email(),
    age:joi.number().min(10).max(80).integer(),
    
})
const updateStatusVal=joi.object({
    status:joi.string().valid("not_read","reading","read").required(),
})


export{
    signUpVal,
    signinVal,
    changePasswordVal,
    forgetPasswordVal,
    resetPasswordVal,
    updateInfoVal,
    updateStatusVal
}