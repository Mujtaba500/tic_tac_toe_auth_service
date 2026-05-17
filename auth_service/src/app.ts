import express from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import chalk from 'chalk';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import { errorHandler } from './utils/middleware/error-handler.js';
import logger from './shared/logger.js';
import AppError from './shared/error.js';
import allRoutes from './routes/routes.js';
// import db from './database/models'
import { authenticateDBConnection, dbInstance } from './database/config/db.config.js';
import { sendServerResponse } from './shared/helpers/index.js';
import { statusCodes } from './shared/constants.js';

const port = process.env.PORT;
const prod = process.env.NODE_ENV === 'production';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan(prod ? 'combined' : 'dev'));

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return sendServerResponse(true, statusCodes.OK, res, 'API live');
    } catch (error) {
      next(error);
    }
  }
);

app.get('/health', async (req, res, next) => {
  try {
    await authenticateDBConnection();
    return sendServerResponse(
      true,
      statusCodes.OK,
      res,
      'Server is up and running'
    );
  } catch (error) {
    next(new AppError(error, 'Health check failed: ', true));
  }
});

/*
All Routes
*/
app.use('/api/v1', allRoutes);

app.use(errorHandler.handleErrorMiddleware);

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', async (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    logger.fatal('Server shutting down');
    logger.flush();
    // await db.sequelize.close();
    await dbInstance.close()

    setImmediate(() => {
      process.exit(1);
    });
  }
});

/*
  Creating http server
*/

const server: http.Server = http.createServer(app);

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');

  server.close(async () => {
    // await db.sequelize.close();
    await dbInstance.close()
    logger.info('Closed out remaining connections');
    logger.fatal('Server shutting down');
    logger.flush();

    setImmediate(() => {
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received.');
  server.close(async () => {
    // await db.sequelize.close();
    await dbInstance.close()
    logger.info('Closed out remaining connections');
    logger.fatal('Server shutting down');
    logger.flush();

    setImmediate(() => {
      process.exit(0);
    });
  });
});

server.listen(port, async () => {
  await authenticateDBConnection();
  logger.info(chalk.green('✓') + ' ' + `Server listening on port ${port}`);
});
