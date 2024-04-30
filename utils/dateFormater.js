function dateFormat(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate.replace(/,/g, "");
}

module.exports = dateFormat;
