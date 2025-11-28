export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  TRIAL = 'TRIAL',
}

export enum SubscriptionPlan {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface Subscription {
  isPremium: boolean;
  status: SubscriptionStatus | null;
  plan: SubscriptionPlan | null;
  expiresAt: string | null;
  revenueCatId?: string;
}

export interface PurchasePackage {
  identifier: string;
  packageType: string;
  product: {
    identifier: string;
    description: string;
    title: string;
    price: number;
    priceString: string;
    currencyCode: string;
  };
  offeringIdentifier: string;
}

export interface CustomerInfo {
  activeSubscriptions: string[];
  allPurchasedProductIdentifiers: string[];
  entitlements: {
    active: Record<string, any>;
    all: Record<string, any>;
  };
  originalAppUserId: string;
}
