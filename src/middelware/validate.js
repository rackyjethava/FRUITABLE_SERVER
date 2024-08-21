const Joi = require("joi");
const pick = require("../helper/pick");

const validat = (schema) => (req, res, next) => {
    //    console.log(schema,"schema");
    //    console.log(req.body);


    const objs = pick(req, Object.keys(schema))
    console.log(objs);
    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly:false
        })
        .validate(objs)

        
        if(error){
            const er=error.details.map((err) => err.message)

            return next("validation error"+er)
        }
        Object.assign(req,value)
        next()


}

module.exports = {
    validat
}

