const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "text must be between 10 and 300 characters";
  }

  if(Validator.isEmpty(data.text)){
    errors.text = 'Post text is Required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
