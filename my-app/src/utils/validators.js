export const isValidEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
export const isValidPhoneVN10 = (phone) => /^[0-9]{10}$/.test(phone);
