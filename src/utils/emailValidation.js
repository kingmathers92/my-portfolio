const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// patterns to block
const domainBlocklist = [
  /.*@test\.com$/,
  /.*@email\.com$/,
  /.*@mail\.com$/,
  /.*@example\.com$/,
  /.*@123\.com$/,
  /.*@abc\.com$/,
  /.*@fake\.com$/,
  /.*@spam\.com$/,
  /test@.*/,
  /email@.*/,
  /mail@.*/,
  /example@.*/,
  /123@.*/,
  /abc@.*/,
  /fake@.*/,
  /spam@.*/,
];

export const validateEmail = (email) => {
  if (
    !emailRegex.test(email) ||
    domainBlocklist.some((pattern) => pattern.test(email.toLowerCase()))
  ) {
    return "Please enter a valid email address.";
  }
  return "";
};
