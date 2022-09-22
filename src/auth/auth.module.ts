import { CACHE_MANAGER, Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../trash/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './auth.constants';
import { JwtRefreshStrategy } from './jwtRefresh.strategy';

@Module({
  imports: [UsersModule, PassportModule,  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '600s'}
  }), CacheModule.register({
    store: redisStore,
    socket:{
      host: 'localhost',
      port: 6379,
    }
})],
 controllers: [AuthController],
  providers: [ AuthService, LocalStrategy, JwtStrategy,  JwtRefreshStrategy],

})
export class AuthModule {}
