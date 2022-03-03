import validator from "validator";

export const textFieldValidator = (min = 1, max = 20, val = "", req = true) => {
  let error = "";
  if (!val && req) {
    error = "Please fill this field!";
  } else if (val) {
    if (val.length < min) {
      error = `Min. length is ${min} characters!`;
    } else if (val.length > max) {
      error = `Max. length is ${max} characters!`;
    } else {
      if (!validator.isAlpha(val)) error = "Please enter only alphabets";
    }
  }
  return error;
};

export const emailFieldValidator = (val = "", allContacts, id, req = true) => {
  let error = "";
  if (!val && req) {
    error = "Please fill this field!";
  } else if (val) {
    if (!validator.isEmail(val)) error = "Please enter a valid email!";
    if (allContacts && allContacts.length > 0) {
      const item = allContacts.find(function (el) {
        return el.isActive && el.email === val.toLowerCase();
      });
      if (item && item.id !== id) error = "This email is already in use!";
    }
  }
  return error;
};
