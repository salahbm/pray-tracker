import { InvalidateQueryFilters } from '@tanstack/react-query';

const userKeys: InvalidateQueryFilters = {
  queryKey: ['users'],
};
const usersListKey = {
  queryKey: ['usersList'],
};

const praysListKeys = 'praysListCache';
const todaysPrayKey = 'todaysPrayCache';

export { userKeys, praysListKeys, todaysPrayKey, usersListKey };
