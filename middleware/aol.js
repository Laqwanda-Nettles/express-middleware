const aol = (req, res, next) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[dayOfWeek];
  const date = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  console.log(
    `You've got mail! Today on ${dayName}, ${date} you have 10 unread messages.`
  );
  next();
};
export { aol };
