import { NextFunction, Request, RequestHandler, Response } from 'express';

import { AuthService } from '../services/auth.service';
import AppError from '../shared/error';

export class AuthController {
  constructor(private __service: AuthService) {}

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<RequestHandler> => {
    try {

      const response = await this.__service.login(req, res);

      return response;

    } catch (error) {

      next(new AppError(error, 'Login Failed: ', true));

    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<RequestHandler> => {
    try {

      const response = await this.__service.createUser(req, res);

      return response;

    } catch (error) {

      next(new AppError(error, 'Signup Failed: ', true));

    }
  };

  public verifyUser =  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<RequestHandler> => {
    try {

      const response = await this.__service.authenticateUser(req, res);

      return response;

    } catch (error) {

      next(new AppError(error, 'Verfication Failed: ', true));

    }
  };
}
