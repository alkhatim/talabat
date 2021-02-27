const timelines = {
  ORDERED: "bx-copy-alt",
  RECEIVED: "bx-package",
  SHIPPED: "bxs-plane-take-off",
  ARRIVED: "bxs-plane-land",
  COMPLETED: "bx-badge-check",
};

export default (order) => {
  const timeline = [];
  let id = 1;
  const statuses = [
    "CREATED",
    "ORDERED",
    "RECEIVED",
    "SHIPPED",
    "ARRIVED",
    "COMPLETED",
  ];
  const status = order.status;
  const orderHistory = order.statusHistory;

  if (status === "CANCELED") {
    const history = orderHistory.find((item) => item.to === status);
    statuses.splice(0, 0, status);
    timeline.push({
      id: id++,
      statusTitle: status,
      iconClass: "bx bx-block h2 text-primary",
      description: `${new Date(history.at).toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}  ,  ${history.by.username}`,
    });
  }

  timeline.push({
    id: id++,
    statusTitle: "CREATED",
    iconClass: `bx bxs-cart-add h2 ${
      status === "CANCELED" ? "text-muted" : "text-primary"
    }`,
    description: `${new Date(order.createdAt).toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}  ,  ${order.createdBy.username}`,
  });

  const active = statuses.slice(0, statuses.indexOf(status) + 1);
  const inactive = statuses.slice(statuses.indexOf(status) + 1);

  active.forEach((item) => {
    if (item === "CANCELED" || item === "CREATED") return;
    const history = orderHistory.find((item) => item.to === status);
    timeline.push({
      id: id++,
      statusTitle: item,
      iconClass: `bx ${timelines[item]} text-primary h2`,
      description: `${new Date(history.at).toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}  ,  ${history.by.username}`,
    });
  });

  inactive.forEach((item) => {
    if (item === "CREATED") return;
    timeline.push({
      id: id++,
      statusTitle: item,
      iconClass: `bx ${timelines[item]} text-muted h2`,
      description: "",
    });
  });

  return timeline.map((item) => ({
    ...item,
    active: item.statusTitle === status,
  }));
};
