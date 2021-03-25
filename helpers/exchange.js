module.exports = (price, from, to, rate) => {
  switch (from) {
    case "USD":
      switch (to) {
        case "SDG":
          return parseFloat(price * rate.USD2SDG);
        case "AED":
          return parseFloat(price * rate.USD2AED);
        case "SAR":
          return parseFloat(price * rate.USD2SAR);
        default:
          return parseFloat(price);
      }
    case "SDG":
      switch (to) {
        case "USD":
          return parseFloat(price / rate.USD2SDG);
        case "AED":
          return parseFloat(price / rate.AED2SDG);
        case "SAR":
          return parseFloat(price / rate.SAR2SDG);
        default:
          return parseFloat(price);
      }
    case "AED":
      switch (to) {
        case "USD":
          return parseFloat(price / rate.USD2AED);
        case "SDG":
          return parseFloat(price * rate.AED2SDG);
        case "SAR":
          return parseFloat(price * rate.AED2SAR);
        default:
          return parseFloat(price);
      }
    case "SAR":
      switch (to) {
        case "USD":
          return parseFloat(price / rate.USD2SAR);
        case "AED":
          return parseFloat(price / rate.AED2SAR);
        case "SDG":
          return parseFloat(price * rate.SAR2SDG);
        default:
          return parseFloat(price);
      }
    default:
      return parseFloat(price);
  }
};
