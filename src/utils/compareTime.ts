/**
 * @description compares two hours in hh:mm:ss format
 * @param {string} time1 - Time to compare (current time)
 * @param {string} time2 - Time to compare (default: 00:00:00)
 * @param {number} diff - Difference in milliseconds (default: 3600000)
 * @returns {boolean} - Returns true if the difference is greater than 1 hour
 */
const compareTime = (time1: string, time2 = "00:00:00", diff = 3600000) => {
  if (time1 < time2) {
    return true;
  }

  return (
    new Date(`1970-01-01T${time1}`).getTime() - new Date(`1970-01-01T${time2}`).getTime() > diff
  );
};

export default compareTime;
