import { Document } from 'mongoose';

export interface User {
  readonly _id: string;
  readonly user_name: string;
  readonly password: string;
}
