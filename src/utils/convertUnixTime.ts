/**
 * Convert Unix Time to HH:MM:SS format
 * @param {number} unixTime - Unix Time to convert
 */
const convertUnixTime = (unixTime = 0) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = `${hours}:${minutes.substr(-2)}:00`;

  return formattedTime;
};

export default convertUnixTime;
