import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ColorConsole } from '@app/common/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        message = (res as any).message ?? exception.message;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        error = (res as any).error ?? error;
      }
    }
    // control properties
    const stack = exception instanceof Error ? exception.stack : undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, originalUrl, body, ip, query } = request;
    console.info(
      ColorConsole.RED,
      '-------------------------------------------------',
    );
    console.info(ColorConsole.RED, `${method} ${originalUrl}`);
    console.info(
      ColorConsole.RED,
      '-------------------------------------------------',
    );
    console.log({
      type: 'ERROR',
      method,
      endpoint: originalUrl,
      status,
      message,
      stack,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body,
      query,
      ip,
      timestamp: new Date().toISOString(),
    });

    response.status(status).json({
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
