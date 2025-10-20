const QueryKeys = {
  users: {
    all: ['users'],
    detail: ['users', 'detail'],
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
    groups: ['friends', 'groups'],
    groupMembers: ['friends', 'groupMembers'],
    approved: ['friends', 'approved'],
    pending: ['friends', 'pending'],
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
};

export default QueryKeys;
