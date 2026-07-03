const Joi = require('joi');
const { AppError } = require('./errorHandler');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((e) => e.message).join(', ');
    return next(new AppError(messages, 400));
  }

  req.validatedBody = value;
  next();
};

const schemas = {
  createCatch: Joi.object({
    fish_species: Joi.string().required().min(2).max(100),
    weight_lbs: Joi.number().optional().positive(),
    length_inches: Joi.number().optional().positive(),
    bait_type: Joi.string().optional().max(100),
    catch_method: Joi.string().optional().max(100),
    caught_at: Joi.date().required(),
    notes: Joi.string().optional().max(1000),
    location_id: Joi.number().optional().positive(),
    is_public: Joi.boolean().optional(),
  }),

  updateCatch: Joi.object({
    fish_species: Joi.string().optional().min(2).max(100),
    weight_lbs: Joi.number().optional().positive(),
    length_inches: Joi.number().optional().positive(),
    bait_type: Joi.string().optional().max(100),
    catch_method: Joi.string().optional().max(100),
    notes: Joi.string().optional().max(1000),
    is_public: Joi.boolean().optional(),
  }),

  signup: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    full_name: Joi.string().optional().max(255),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { validate, schemas };
