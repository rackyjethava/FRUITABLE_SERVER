const Joi = require("joi")

const creatCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).trim(),
        description: Joi.string().required(),
    })
}

const getCategory = {
    query:Joi.object().keys({
        cat_id: Joi.string().required()
    })
}

const updateCategory = {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).trim(),
        description: Joi.string().required(),
    }),
    perms:Joi.object().keys({
        name: Joi.string().required()
    })
}

const deleteCategory = {
    perms:Joi.object().keys({
        cat_id: Joi.string().required().max(2)
    })
}


module.exports = { 
    creatCategory,
    getCategory,
    updateCategory,
    deleteCategory
 };
