import { authService } from '../services';

import { AuthController } from './auth.controller';

export const authController = new AuthController(authService);
