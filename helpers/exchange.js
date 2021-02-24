module.exports = (price, from, to, rate) => {
  let usd = 0;

  switch (from) {
    case "USD":
      usd = parseFloat(price);
      break;
    case "SDG":
      usd = parseFloat(price / rate.SDG);
      break;
    case "AED":
      usd = parseFloat(price / rate.AED);
      break;
    case "SAR":
      usd = parseFloat(price / rate.SAR);
      break;
    default:
      usd = parseFloat(price);
  }

  switch (to) {
    case "USD":
      return parseFloat(usd);
    case "SDG":
      return parseFloat(usd * rate.SDG);
    case "AED":
      return parseFloat(usd * rate.AED);
    case "SAR":
      return parseFloat(usd * rate.SAR);
    default:
      return parseFloat(usd);
  }
};
