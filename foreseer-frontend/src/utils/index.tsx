const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const shortMonths = months.map((month) => month.slice(0, 3));

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine the suffix for the day (st, nd, rd, th)
  let daySuffix = "th";
  if (day === 1 || (day > 20 && day % 10 === 1)) {
    daySuffix = "st";
  } else if (day === 2 || (day > 20 && day % 10 === 2)) {
    daySuffix = "nd";
  } else if (day === 3 || (day > 20 && day % 10 === 3)) {
    daySuffix = "rd";
  }

  // Determine am or pm
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time, and ensure 0 becomes 12
  const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure minutes are 2 digits

  return `${day}${daySuffix} ${month}, ${formattedHours}:${formattedMinutes}${ampm}`;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day}${month}${year}`;
}

function camelToSnake(s: string): string {
  return s.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function toSnakeCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  }

  return Object.keys(obj).reduce((result, key) => {
    const snakeKey = camelToSnake(key);
    result[snakeKey] = toSnakeCase(obj[key]);
    return result;
  }, {} as any);
}

function snakeToCamel(s: string): string {
  return s.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

export function toCamelCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  }

  return Object.keys(obj).reduce((result, key) => {
    const camelKey = snakeToCamel(key);
    result[camelKey] = toCamelCase(obj[key]);
    return result;
  }, {} as any);
}

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export function trimLargeString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength)}...`;
}

export function numberToBytes32(num: number) {
  // Convert the number to a hexadecimal string
  const hexString = num.toString(16);

  // Pad the string to 64 characters (32 bytes)
  const paddedHexString = hexString.padStart(64, "0");

  // Add the '0x' prefix
  return "0x" + paddedHexString;
}
