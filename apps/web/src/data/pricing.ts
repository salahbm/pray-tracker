import { IPricing } from "@/types";

export const tiers: IPricing[] = [
  {
    name: "Free",
    price: 0,
    features: [
      "Accurate prayer times",
      "Basic prayer tracking",
      "Qibla direction",
      "Daily notifications",
      "Basic statistics",
    ],
  },
  {
    name: "Pro Monthly",
    price: 2.99,
    features: [
      "All Free features",
      "Detailed prayer analytics",
      "Advanced tracking features",
      "Custom themes and UI options",
      "Ad-free experience",
      "Extended statistics",
      "Priority support",
    ],
  },
  {
    name: "Pro Yearly",
    price: 24.99,
    features: [
      "All Pro Monthly features",
      "2 months free",
      "Early access to new features",
      "Premium community badge",
      "Custom prayer reminders",
      "Extended data history",
      "Premium support priority",
    ],
  },
];
