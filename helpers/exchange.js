module.exports = (price, from, to, rate) => {
  let usd = 0;

  switch (from) {
    case "USD":
      usd = price;
    case "SDG":
      usd = price / rate.SDG;
    case "AED":
      usd = price / rate.AED;
    case "SAR":
      usd = price / rate.SAR;
    default:
      usd = price;
  }

  switch (to) {
    case "USD":
      return usd;
    case "SDG":
      return usd * rate.SDG;
    case "AED":
      return usd * rate.AED;
    case "SAR":
      return usd * rate.SAR;
    default:
      return usd;
  }
};
