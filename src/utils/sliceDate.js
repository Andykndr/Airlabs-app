const sliceDate = (str) => {
  if (!str) return str;
  return str.slice(0, 11);
};

export default sliceDate;
