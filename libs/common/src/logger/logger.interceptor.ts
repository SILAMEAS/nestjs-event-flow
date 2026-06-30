import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = context.switchToHttp().getResponse();

    const start = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, originalUrl, body, query, ip, headers } = request;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        console.log({
          type: 'SUCCESS',

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          method,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          endpoint: originalUrl,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          status: response.statusCode,

          duration: `${duration}ms`,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          query,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ip,

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          userAgent: headers['user-agent'],
        });
      }),
    );
  }
}
