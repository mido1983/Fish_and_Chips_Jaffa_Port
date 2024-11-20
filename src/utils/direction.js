export const isRTL = (language) => {
  return ['he', 'ar'].includes(language);
};

export const getDirection = (language) => {
  return isRTL(language) ? 'rtl' : 'ltr';
}; 