export const isTimeInRange = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 12 || (hours === 12 && minutes <= 40)) {
    return true;
  }

  return false;
};

export function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return [...array];
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
