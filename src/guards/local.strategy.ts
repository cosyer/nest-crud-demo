import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/user.interface';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {
    super({
      usernameField: 'user_name',
      passwordField: 'password',
    } as IStrategyOptions);
  }
  async validate(user_name: string, password: string): Promise<User> {
    const user = await this.userModel
      .findOne({
        user_name,
      })
      .exec();
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
}
