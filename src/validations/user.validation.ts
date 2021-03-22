import * as Joi from 'joi';

export const signUpValidation = Joi.object({
  fullName: Joi.string().min(5).required(),
  login: Joi.string().min(5).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const signInValidation = Joi.object({
  login: Joi.string().min(5).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
