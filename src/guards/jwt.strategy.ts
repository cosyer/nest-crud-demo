import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: 'cosyer',
    });
  }
  async validate(payload: any): Promise<User> {
    return {
      user_name: payload.user_name,
      _id: payload._id,
      password: payload.password,
    };
  }
}
