import { AuthService } from './auth.service';

import { authRepository } from '../repositories';

export const authService: AuthService = new AuthService(authRepository);
