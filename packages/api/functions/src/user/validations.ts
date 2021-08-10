import {loginDetails, signupDetails, validationResult} from "./types";

const isEmail = (email: string): boolean =>
  // prettier-ignore
  // eslint-disable-next-line max-len
  !!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const isEmpty = (field: string): boolean => field.trim() === "";

export const validateSignupData = (data: signupDetails): validationResult => {
  const result: validationResult = {
    errors: {},
    valid: true,
  };

  if (isEmpty(data.email)) {
    result.errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    result.errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) result.errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword) {
    result.errors.confirmPassword = "Passwords must match";
  }
  if (isEmpty(data.userName)) result.errors.userName = "Must not be empty";
  result.valid = Object.keys(result.errors).length === 0 ? true : false;
  return result;
};

export const validateLoginData = (data: loginDetails): validationResult => {
  const result: validationResult = {
    errors: {},
    valid: true,
  };


  if (isEmpty(data.email)) result.errors.email = "Must not be empty";
  if (isEmpty(data.password)) result.errors.password = "Must not be empty";

  result.valid = Object.keys(result.errors).length === 0 ? true : false;
  return result;
};
