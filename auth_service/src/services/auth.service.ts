import { Request, RequestHandler, Response } from 'express';

import * as HelperClass from '../shared/helper';
import * as repositories from '../repositories';

import { statusCodes } from '../shared/constants';
import { ANY } from '../shared/types';

import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export class AuthService extends HelperClass.helper {
  constructor(private __repo: typeof repositories.authRepository) {
    super();
  }

  public login = async (
    req: Request,
    res: Response
  ): Promise<RequestHandler> => {

      const verifiedUser = await this.verifyUser(req.body);

      if ( !verifiedUser ) {
        return this.sendServerResponse(false, statusCodes.BAD_REQUEST, res, 'Invalid credentials' );
      }

      const { user_name , id } = verifiedUser;

      const jwtToken = await this.createJwtToken( { user_name , user_id: id } );

      const dataToSend = { id, user_name , jwt_token: jwtToken};

      return this.sendServerResponse(true, statusCodes.OK, res, 'Login Successful', dataToSend );

  };

  public createUser = async ( req: Request, res: Response ): Promise<RequestHandler> => {

      const { username, password } = req.body

       const userExists = await this.__repo.findOne({
        user_name: username
      });

      if (userExists) {

        return this.sendServerResponse(false, statusCodes.BAD_REQUEST, res, "User with this username already exists" );

      }

      const hashedPassword = await this.hashPassword(password);

      const newUser : ANY = this.shallowCopy(await this.__repo.create({ user_name: username , password: hashedPassword }));

       const jwtToken = await this.createJwtToken( { user_name: username , user_id: newUser.id } );

      const dataToSend = { id: newUser.id, user_name: newUser.user_name , jwt_token: jwtToken}

      return this.sendServerResponse(true, statusCodes.OK, res, 'Sign up successful', dataToSend );

  }

  public authenticateUser = async ( req: Request, res: Response ): Promise<RequestHandler> => {

    let token = req.headers.authorization;

    if ( !token ) {

      return this.sendServerResponse(false, statusCodes.NOT_AUTHENTICATED, res, "Unauthorized" );

    }

    try {

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ANY;

    return this.sendServerResponse(true, statusCodes.OK, res, null, decoded );


  } catch (err: ANY) {

    console.log("Error while verifying token", err.message);

    return this.sendServerResponse(false, statusCodes.NOT_AUTHENTICATED, res, "Unauthorized" );

  }


  }

  private hashPassword = async (password: string) => {
      return bcrypt.hash(password, 10);
  };

  private comparePassword = (password: string, hashPass: string) => {
      return bcrypt.compare(password, hashPass);
  };

  private createJwtToken = async (data: ANY) => {

    const { user_name , user_id } = data;

    const dataToSign = { user_name , user_id };

    console.log(dataToSign)

    return jwt.sign( dataToSign, process.env.JWT_SECRET);

  }
  
  private verifyUser = async (data: {username: string , password: string }) => {
    
    const { username , password } = data;

    const userCheck : ANY = this.shallowCopy(await this.__repo.findOne({user_name: username}));

    if ( !userCheck ) {
      return null
    } 

    const passVerify = await this.comparePassword(this.convertToString(password), userCheck.password);

    if (!passVerify) {
      return null
    }

    return userCheck;

  } 

}
