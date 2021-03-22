import * as Joi from 'joi';

const photoValidation = Joi.object({
  fieldname: Joi.string().min(5).required(), //"photo",
  originalname: Joi.string().min(5).required(),
  encoding: Joi.string().min(4).required(), //'7bit',
  mimetype: Joi.string().min(5).required(), //'image/jpeg',
  destination: Joi.string().min(5).required(), //'D:\\arsen\\Work\\development\\internship\\projects\\converter\\src\\uploads'
  filename: Joi.string().min(5).required(),
  path: Joi.string().min(5).required(), // 'D:\\arsen\\Work\\development\\internship\\projects\\converter\\src\\uploads\\1bb2176bbe89e7fa8cd9a3801d8595a3.jpg',
  size: Joi.number().max(5000000).required(),
});

export default photoValidation;
