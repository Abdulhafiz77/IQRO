
import * as Joi from 'joi'

const auth_joi = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
}).unknown(true);


export {
    auth_joi
}