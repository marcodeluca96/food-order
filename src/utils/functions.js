export const isTimeInRange = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 12 || (hours === 12 && minutes <= 40)) {
    return true;
  }

  return false;
};
