const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data. andle = isEmpty(data.handle) ? "" : data.handle;
  data.status = isEmpty(data.status) ? "" : data.status;

  if(!Validator.isLength(data.handle, { min:2, max: 40})){
    errors.handle = 'Handle Needs to be Betweeen 2 and 40 characters'
  }

  if(Validator.isEmpty(data.handle)){
    errors.handle = 'Handle is Required'
  }

  if(Validator.isEmpty(data.status)){
    errors.status = 'Status is Required'
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = 'Not a valid URL'
    }
  }

  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
      errors.twitter = 'Not a valid URL'
    }
  }

  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)){
      errors.instagram = 'Not a valid URL'
    }
  }

  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
      errors.facebook = 'Not a valid URL'
    }
  }

  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)){
      errors.linkedin = 'Not a valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
