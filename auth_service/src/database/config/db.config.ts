import AppError from '../../shared/error.js';
import 'dotenv/config';
import logger from '../../shared/logger.js';
import chalk from 'chalk';
// import * as dbInstance from '../models'
import { Sequelize } from 'sequelize';
import { ANY } from '../../shared/types/types.js';

const dbName = process.env.DATABASE_NAME!
const dbUserName = process.env.DATABASE_USERNAME!
const dbPassword = process.env.DATABASE_PASSWORD!
const dbHost = process.env.DATABASE_HOST

export const dbInstance = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
});

export const authenticateDBConnection = async () => {
  try {
    logger.info(`DATABASE NAME: ${dbName}`)
    await dbInstance.authenticate();
    logger.info(
      chalk.green('✓') +
        ' ' +
        'Database connection has been established successfully.'
    );
  } catch (error: ANY) {
    throw new AppError(error, 'Unable to connect to the database:', true);
  }
};

// export const authenticateDBConnection = async () => {
//   try {
//     await dbInstance.sequelize.authenticate();
//     logger.info(
//       chalk.green('✓') +
//         ' ' +
//         'Database connection has been established successfully.'
//     );
//   } catch (error) {
//     throw new AppError(error, 'Unable to connect to the database:', true);
//   }
// };

