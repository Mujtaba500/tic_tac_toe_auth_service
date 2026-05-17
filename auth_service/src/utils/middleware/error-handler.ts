import express from 'express';
import logger from '../../shared/logger.js';
import AppError from '../../shared/error.js';
import { statusCodes } from '../../shared/constants.js';
import { sendServerResponse } from '../../shared/helpers/index.js';

class ErrorHandler {
  public async handleErrorMiddleware(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {

    logger.error(err);

    return sendServerResponse( false, statusCodes.INTERNAL_SERVER_ERROR , res , 'Internal Server error', null , err.message);

    // await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
  }

  public handleError(err: Error) {
    logger.error(err);
  }

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
