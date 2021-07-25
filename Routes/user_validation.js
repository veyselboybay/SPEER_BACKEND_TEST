const joi = require('@hapi/joi');

//Validating the user inputs through joi
const registerValidation = (data) => {
    const schema = joi.object({
        username:joi.string().required(),
        email:joi.string().min(6).email().required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = joi.object({
        email:joi.string().min(6).email().required(),
        password:joi.string().min(6).required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;