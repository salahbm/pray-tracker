import { InvalidateQueryFilters } from '@tanstack/react-query';

const userKeys: InvalidateQueryFilters = {
  queryKey: ['users'],
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

export {
  userKeys,
  praysListKeys,
  todaysPrayKey,
  usersListKey,
  awards,
  approvedFriendsList,
  pendingFriendsList,
};
