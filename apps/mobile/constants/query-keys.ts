const QueryKeys = {
  users: {
    all: ['users'],
    detail: ['users', 'detail'],
    session: ['users', 'session'],
  },
  awards: {
    all: ['awards'],
    detail: ['awards', 'detail'],
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
  leaderboard: {
    global: ['leaderboard', 'global'],
    friends: ['leaderboard', 'friends'],
    rank: ['leaderboard', 'rank'],
  },
  pro: {
    all: ['pro'],
    detail: ['pro', 'detail'],
  },
  subscriptions: {
    all: ['subscriptions'],
    status: (userId: string) => ['subscriptions', 'status', userId],
  },
};

export default QueryKeys;
