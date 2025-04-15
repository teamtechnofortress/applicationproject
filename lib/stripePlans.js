export const PLAN_IDS = {
    price_3_month: process.env.NEXT_PUBLIC_PRICE_3_MONTH,
    price_6_month: process.env.NEXT_PUBLIC_PRICE_6_MONTH,
    price_12_month: process.env.NEXT_PUBLIC_PRICE_12_MONTH,
    price_one_time: process.env.NEXT_PUBLIC_PRICE_ONE_TIME,
};

export const PLAN_DURATIONS = {
  [PLAN_IDS.price_3_month]: 3,
  [PLAN_IDS.price_6_month]: 6,
  [PLAN_IDS.price_12_month]: 12,
  [PLAN_IDS.price_one_time]: 4,

  
};

export const PLAN_LABELS = {
  [PLAN_IDS.price_3_month]: "Wohnungmappe 3 Monate",
  [PLAN_IDS.price_6_month]: "Wohnungmappe 6 Monate",
  [PLAN_IDS.price_12_month]: "Wohnungmappe 12 Monate",
  [PLAN_IDS.price_one_time]: "4 Tage voller Zugang",
};

export const PLAN_PRICES = {
    [PLAN_IDS.price_3_month]: "29,99€",
    [PLAN_IDS.price_6_month]: "19,99€",
    [PLAN_IDS.price_12_month]: "12,99€",
    [PLAN_IDS.price_one_time]: "2,95€",
  };