import joi from "joi"
const addToWishlistVal=joi.object({
    book:joi.string().hex().length(24).required()
})


const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const updateWishlistVal=joi.object({

    book:joi.string().hex().length(24).required()

})
export {
    addToWishlistVal,
    paramsIdVal,
    updateWishlistVal
}