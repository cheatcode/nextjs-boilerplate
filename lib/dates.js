import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const monthDayYear = (timestamp = "") => {
  return dayjs(timestamp).format("MMMM Do, YYYY");
};

export const monthDayYearAtTime = (timestamp = "") => {
  return dayjs(timestamp).format("MMMM Do, YYYY [at] hh:mm a");
};
