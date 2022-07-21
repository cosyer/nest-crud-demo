import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// 自定义策略需要实现CanActivate方法
@Injectable()
export class AuthStrategy implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    const guard = AuthStrategy.getAuthGuard(noAuth);
    return guard.canActivate(context); // 执行所选策略的canActivate方法
  }

  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    return new (AuthGuard(noAuth ? 'local' : 'jwt'))();
  }
}
