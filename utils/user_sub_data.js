export const fetchSubscriptionStatus = async () => {
    try {
      const res = await fetch("/api/user/subscription");
      const data = await res.json();
      return res.ok ? data.data : null;
    } catch (err) {
      console.error("Subscription fetch error:", err);
      return null;
    }
};

export const canViewTipps = (subscriptionData) => {
  if (!subscriptionData) return false;
  if (subscriptionData.currentplan !== "4 Tage") {
    return subscriptionData.status === "active";
  }
  if (subscriptionData.currentplan === "4 Tage") {
    return subscriptionData.status === "active";
  }
  return false;
};