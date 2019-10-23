const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;
  data.organization = isEmpty(data.organization) ? "" : data.organization;
  data.from = isEmpty(data.from) ? "" : data.from;

  if(Validator.isEmpty(data.title)){
    errors.title = 'Title is Required'
  }

  if(Validator.isEmpty(data.organization)){
    errors.organization = 'Organization is Required'
  }

  if(Validator.isEmpty(data.from)){
    errors.from = 'From is Required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
