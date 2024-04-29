const Joi = require("joi");

// Define validation schema for registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  uniqueCode: Joi.string().required()
});

// Function to validate registration data
export const registerValidation = (data: any) => {
  return registerSchema.validate(data);
};
module.exports.registerValidation = registerValidation;


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginValidation = (data: any) => {
  return loginSchema.validate(data);
};

module.exports.loginValidation = loginValidation;
