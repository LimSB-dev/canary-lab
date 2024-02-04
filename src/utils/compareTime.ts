/**
 * Compares two hours in hh:mm:ss format
 * @param {string} time1 - Time to compare
 * @param {string} time2 - Time to compare (default: 00:00:00)
 * @param {number} diff - Difference in milliseconds (default: 3600000)
 */
const compareTime = (time1: string, time2 = "00:00:00", diff = 3600000) => {
  const date1 = new Date(`2000-01-01T${time1}`);
  const date2 = new Date(`2000-01-01T${time2}`);

  const timeDifference = Math.abs(date1.getTime() - date2.getTime());

  return timeDifference >= diff;
};

export default compareTime;
