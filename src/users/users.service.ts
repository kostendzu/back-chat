
import { Injectable, Inject } from '@nestjs/common';
import { user } from './users.entity';
import {CreateUser} from './users.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof user
  ) {}

   async findAll(): Promise<user[]> {
     return this.usersRepository.findAll<user>()
  }

   async create(one: CreateUser): Promise<user>{
      return await this.usersRepository.create<user>(one)
   }
}