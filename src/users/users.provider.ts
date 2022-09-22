import { user } from './users.entity';

export const  UsersProvider  = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: user,
  },
];
