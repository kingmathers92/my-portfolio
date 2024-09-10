export const validateMessage = (message) => {
  const minLength = 20;

  if (message.length < minLength) {
    return "Message is too short!";
  }

  const spamWords = ["spam", "offer", "money"];
  for (let word of spamWords) {
    if (message.toLowerCase().includes(word)) {
      return "Your message contains prohibited words!";
    }
  }

  return "";
};
