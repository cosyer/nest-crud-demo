import { Document } from 'mongoose';

export interface User extends Document {
  readonly user_name: string;
  readonly password: string;
}
