import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));

    // const reflector = new Reflector();
    // const controllerTag = reflector.get<string>('log', context.getClass());
    // const handlerTag = reflector.get<string>('log', context.getHandler());
    // const request = context.switchToHttp().getRequest();
    // const {
    //   method,
    //   url,
    //   headers: { host, 'user-agent': userAgent },
    // } = request;
    // const now = Date.now();
    // return next.handle().pipe(
    //   tap(() => {
    //     Logger.log(
    //       `${method} ${url} ${Date.now() - now}ms`,
    //       context.getClass().name,
    //     );
    //   }),
    //   catchError(err => {
    //     Logger.error(
    //       `${method} ${url} ${Date.now() - now}ms`,
    //       err,
    //       context.getClass().name,
    //     );
    //     return throwError(err);
    //   }),
    // );
  }
}
