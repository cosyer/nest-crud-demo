import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { LocalStrategy } from 'src/guards/local.strategy';
import { UserController } from './user.controller';
import { userSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: userSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'cosyer',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
