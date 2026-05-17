import { AuthRepository } from './auth.repository';
// import db from '../database/models';
import userModel from '../database/models/user';

export const authRepository = new AuthRepository(userModel);
