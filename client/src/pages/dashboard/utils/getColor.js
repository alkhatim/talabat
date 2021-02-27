module.exports = (status) => {
  switch (status) {
    case "CREATED":
      return "primary";
    case "ORDERED":
      return "danger";
    case "RECEIVED":
      return "warning";
    case "SHIPPED":
      return "info";
    case "ARRIVED":
      return "primary";
    default:
      return "success";
  }
};
