import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
//import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, ChatModule ],
  providers: [AppGateway, AppService],  
 // controllers: [AppController]
})
export class AppModule {}
