/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const bcryptjs = require('bcryptjs');
import bcryptjs from 'bcryptjs';
import { RateLimit } from 'nestjs-rate-limiter';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO, EditUserDTO, LoginDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { NoAuth } from 'src/decorator/no-auth';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

// 盐值
const SALT = 10;

@Controller('users')
@ApiTags('用户接口')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // GET /users
  @Get()
  @ApiOperation({
    description: '获取用户列表',
    summary: '获取用户列表',
  })
  // @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'success',
    };
  }

  // GET /users/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findOne(_id),
      message: 'success',
    };
  }

  // POST /users
  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    // 加密
    await this.userService.addOne({
      ...body,
      password: bcryptjs.hashSync(body.password, SALT),
    });
    return {
      code: 200,
      message: 'success',
    };
  }

  // PUT /users/:_id
  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'success',
    };
  }

  // DELETE /users/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'success',
    };
  }

  // POST /users/login
  // @UseGuards(AuthGuard('local'))
  @NoAuth()
  @Post('login')
  @RateLimit({
    keyPrefix: 'login',
    points: 1,
    duration: 1,
    errorMessage: '请求太快了，请稍后重试',
  })
  async login(@Body() user: LoginDTO, @Req() req) {
    return req.user;
  }

  @Post('login2')
  @NoAuth()
  async login2(@Body() user: LoginDTO) {
    return {
      token: this.jwtService.sign(user),
    };
  }
}
