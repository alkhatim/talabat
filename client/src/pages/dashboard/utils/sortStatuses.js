const statuses = {
  CREATED: 1,
  ORDERED: 2,
  RECEIVED: 3,
  SHIPPED: 4,
  ARRIVED: 5,
  COMPLETED: 6,
};

module.exports = (a, b) => {
  return statuses[a.status] - statuses[b.status];
};
