import { Schema } from 'mongoose';
// let autoIncrement = require('mongoose-auto-increment-fix');
// nest g resource user

export const userSchema = new Schema(
  {
    user_name: { type: String, required: true },
    password: { type: String, required: true }, // select: false 隐藏此列
  },
  {
    versionKey: false,
  },
);

//下面用自增插件，实现id的自增功能
// accountSchema.plugin(autoIncrement.plugin, {
//   model: 'users',
//   field: 'id',
//   startAt: 10000,
//   incrementBy: 1
// });
