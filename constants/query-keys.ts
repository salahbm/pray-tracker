import { InvalidateQueryFilters } from '@tanstack/react-query';

const userKeys: InvalidateQueryFilters = {
  queryKey: ['users'],
};
const usersListKey = 'usersListCache';

const praysListKeys = 'praysListCache';
const todaysPrayKey = 'todaysPrayCache';

export { userKeys, praysListKeys, todaysPrayKey, usersListKey };
