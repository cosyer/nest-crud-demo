import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthStrategy } from './guards/auth.strategy';
import { UserModule } from './user/user.module';

const DBModule = MongooseModule.forRoot('mongodb://username:paasword@ip:27017');

@Module({
  imports: [
    DBModule,
    UserModule,
    RateLimiterModule.register({
      for: 'Express',
      type: 'Memory',
      points: 1,
      duration: 1, // 1秒访问1次
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // 全局守卫
      useClass: AuthStrategy,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
