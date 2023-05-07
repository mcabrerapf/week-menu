const generateRandomNumber = (min = 0, max = 100) => {
  if (min === max) return min;
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
};

export default generateRandomNumber;
