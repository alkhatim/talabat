const colors = ["#E74C3C", "#2471A3", "#196F3D ", "#F4D03F ", "#34495E"];
module.exports = () => {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
};
