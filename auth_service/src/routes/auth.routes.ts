import express from 'express';
import { authController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/signup', authController.createUser);

authRouter.get('/verifyUser', authController.verifyUser);

export default authRouter;
