import moment from "moment";
import _ from "lodash";

/**
 * Get the date & time as single value from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getDateTime = (timestamp, format) => {
  return getDate(timestamp, format) + " " + getTime(timestamp, format);
};

/**
 * Get the date from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getDate = (timestamp, format) => {
  format = _.isUndefined(format) ? "DD-MM-YYYY" : format;
  return timestamp ? moment(timestamp, "YYYY-MM-DD").format(format) : "-";
};

/**
 * Get the time from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getTime = (timestamp, format) => {
  format = _.isUndefined(format) ? "hh:mm:ss" : format;
  return timestamp ? moment(timestamp).format(format) : "-";
};

/**
 * Get the time from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getTimeUTC = (timestamp, format) => {
  format = _.isUndefined(format) ? "hh:mm:ss" : format;
  return moment(timestamp).isValid()
    ? moment.utc(timestamp).format(format)
    : "-";
};

/**
 * Get the time from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getDateUTC = (timestamp, format) => {
  format = _.isUndefined(format) ? "DD-MM-YYYY" : format;
  return moment(timestamp).isValid()
    ? moment.utc(timestamp).format(format)
    : "-";
};

/**
 * Get UTC date time from the given timestamp
 *
 * @param timestamp - timestamp to get time
 * @param format - display format
 */
export const getUTCDateTime = timestamp => {
  return moment(timestamp).isValid()
    ? moment.utc(timestamp).format("DD-MM-YYYY HH:mm A")
    : "-";
};

/**
 * Return the default dash if given value is empty
 *
 * @param string
 */
export const getDefaultFor = value => {
  return value || value === 0 || value === "0" ? value : "-";
};

/**
 * Return the basename of URL
 *
 * @param string
 * @return string
 */
export const urlBasename = url => {
  return !_.isEmpty(url) ? url.substring(url.lastIndexOf("/") + 1) : "";
};

/**
 * parse the URL query params and return in object format
 *
 * @param string - query params
 * @return object
 */
export const parseQueryParams = query => {
  if (!_.isEmpty(query)) {
    //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
    const queryArray = query.split("?")[1].split("&");
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split("=");
      queryParams[key] = val ? val : true;
    }
    return queryParams;
  }
  return {};
};

/**
 * Method to convert UI date format to API date format
 * @param {*} date
 */
export const toAPIDate = date => {
  // return on empty
  if (!date) return date;
  let ds = date.split("-");
  return ds.length
    ? ds[0].length > 2
      ? date
      : `${ds[2]}-${ds[1]}-${ds[0]}`
    : moment().format("DD-MM-YYYY");
};

/**
 * Roundup Number with decimals
 * @param {*} value
 * @param {*} decimals
 */
export const round = function (value, decimals) {
  if (value === "" || value === undefined) {
    return "";
  }
  // check and round negative values
  return value >= 0
    ? Number(Math.round(value + "e" + decimals) + "e-" + decimals)
    : Number(Math.round(Math.abs(value) + "e" + decimals) + "e-" + decimals);
};

/**
 * function is to convert seconds to hh:mm string
 * @param {number} e
 */
export const secondsToTime = function (e, format = "m:s") {
  var h = Math.floor(e / 3600)
    .toString()
    .padStart(2, "0");
  var m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");
  return format === "h:m"
    ? (h > 0 ? h + " hrs " : "") + m + " mins"
    : m + ":" + s;
};

/**
 * function is to convert minutes to hh:mm string
 * @param {number} e
 */
export const minutesToTime = function (e) {
  var h = Math.floor(e / 60)
    .toString()
    .padStart(2, "");
  var m = Math.floor(e % 60)
    .toString()
    .padStart(2, "");
  return (
    (h > 0 ? h + (h < 2 ? "hr " : "hrs ") : "") + (m > 0 ? m + "mins" : "")
  );
};
