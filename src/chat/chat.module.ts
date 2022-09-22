import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import * as redisStore from 'cache-manager-redis-store'
import { JwtGuard } from 'src/auth/auth.jwtGuard';

@Module({
  imports: [
    CacheModule.register({
    store: redisStore,
    socket:{
      host: 'localhost',
      port: 6379,
    }
})
],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
