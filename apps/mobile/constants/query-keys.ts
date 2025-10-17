const userKeys = {
  queryKey: ['user'],
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};

const usersListKey = {
  queryKey: ['usersList'],
};

const awards = {
  queryKey: ['awards'],
};

const praysListKeys = {
  queryKey: ['praysListCache'],
};
const todaysPrayKey = {
  queryKey: ['todaysPrayCache'],
};

const approvedFriendsList = {
  queryKey: ['friendsListCache'],
};

const pendingFriendsList = {
  queryKey: ['pendingFriendsListCache'],
};

const proKeys = {
  queryKey: ['pro'],
};

export {
  approvedFriendsList,
  awards,
  pendingFriendsList,
  praysListKeys,
  proKeys,
  todaysPrayKey,
  userKeys,
  usersListKey,
};
