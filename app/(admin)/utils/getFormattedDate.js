/**
 * Returns a formatted date
 * @param {String} date The date to format. In this similar format "2024-03-25T14:46:11.869Z"
 * @returns The formatted string. Similar to Mar 25, 2024, 08:46 AM.
 */
export default function getFormattedDate(date) {
  const createdAtDate = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = dateTimeFormat.format(createdAtDate);
  console.log(formattedDate);

  return formattedDate;
}
