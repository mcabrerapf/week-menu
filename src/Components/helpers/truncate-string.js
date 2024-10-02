const truncateString = (string = '', limit = 10) => {
  if (string.length <= limit) return string;
  return `${string.substring(0, limit)}...`;
};

export default truncateString;
