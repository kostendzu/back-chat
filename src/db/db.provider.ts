import { Sequelize } from 'sequelize-typescript';
import { user } from '../users/users.entity'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      sequelize.addModels([user]);
      await sequelize.sync();
      return sequelize;
    },
  },
];