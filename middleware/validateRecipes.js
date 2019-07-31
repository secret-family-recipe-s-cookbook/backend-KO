const { check, validationResult } = require('express-validator');

const validateRecipes = [
  check('title')
    .isLength({ min: 1 })
    .withMessage('Please input a title')
    .trim(),
  check('description')
    .isLength({ min: 1 })
    .withMessage('Please add a description')
    .trim(),
  check('ingredients')
    .isLength({ min: 1 })
    .withMessage('A recipe needs ingridients please')
    .trim(),
  check('directions')
    .isLength({ min: 1 })
    .withMessage('please add directions on how to use your recipe')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg)
      });
    }
    next();
  }
];

module.exports = validateRecipes;
