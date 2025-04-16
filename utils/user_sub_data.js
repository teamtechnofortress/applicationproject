import { DateTime } from 'luxon';

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
  

export const isOneTimeValid = (subscriptionData) => {
  if (subscriptionData?.paymentType === "one-time") {
    const created = DateTime.fromISO(subscriptionData.createdAt);
    return DateTime.now() < created.plus({ days: 4 });
  }
  return false;
};

export const canViewTipps = (subscriptionData) => {
    if (!subscriptionData) return false;
    if (subscriptionData.paymentType === "subscription") {
      return subscriptionData.status === "active";
    }
    if (subscriptionData.paymentType === "one-time") {
      return isOneTimeValid(subscriptionData);
    }
    return false;
  };