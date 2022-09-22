import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.provider';
import { UserService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/auth/auth.jwtGuard';

@Module({
  controllers: [UsersController],
  providers: [...UsersProvider, UserService],
  exports:[UserService]
})
export class UsersModule {}
