const QueryKeys = {
  users: {
    all: ['users'],
    detail: ['users', 'detail'],
    session: ['users', 'session'],
  },
  prays: {
    list: ['prays', 'list'],
    today: ['prays', 'today'],
  },
  friends: {
    all: ['friends', 'all'],
    groups: ['friends', 'groups'],
    groupMembers: ['friends', 'groupMembers'],
  },
  inquiries: {
    all: ['inquiries'],
    detail: ['inquiries', 'detail'],
  },
  onboarding: {
    preferences: ['onboarding', 'preferences'],
    complete: ['onboarding', 'complete'],
  },
  fasting: {
    history: ['fasting', 'history'],
  },
  subscriptions: {
    status: ['subscriptions', 'status'],
    isPremium: ['subscriptions', 'isPremium'],
  },
};

export default QueryKeys;
