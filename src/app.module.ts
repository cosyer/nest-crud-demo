import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthStrategy } from './guards/auth.strategy';
import { UserModule } from './user/user.module';

const DBModule = MongooseModule.forRoot('mongodb://username:paasword@ip:27017');

@Module({
  imports: [DBModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // 全局守卫
      useClass: AuthStrategy,
    },
  ],
})
export class AppModule {}
