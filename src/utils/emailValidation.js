const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// patterns to block
const domainBlocklist = [
  /.*@test\.com$/,
  /.*@example\.com$/,
  /.*@fake\.com$/,
  /.*@spam\.com$/,
  /.*@mailinator\.com$/,
  /.*@yopmail\.com$/,
  /.*@tempmail\.com$/,
  /.*@dispostable\.com$/,
  /.*@guerrillamail\.com$/,
  /.*@discardmail\.com$/,
  /.*@getnada\.com$/,
  /.*@email\.com$/,
  /.*@123\.com$/,
  /.*@abc\.com$/,
  /.*@mail\.com$/,
  /.*@throwawaymail\.com$/,
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
