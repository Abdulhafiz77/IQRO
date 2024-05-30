import * as Joi from 'joi'

const product_add_joi = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    discription: Joi.string().required()
   
}).unknown(true);

const id_joi = Joi.object({
    id: Joi.number().required()
}).unknown(true);


export{
    product_add_joi,
    id_joi
}