import { BaseRepository } from '../shared/base-repository.js';
// import * as models from '../database/models';
import userModel from '../database/models/user.js';

export class AuthRepository extends BaseRepository<typeof userModel> {
  constructor(protected users: typeof userModel) {
    super(users);
  }
}
