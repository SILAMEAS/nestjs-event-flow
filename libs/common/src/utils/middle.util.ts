import {
  Injectable,
  NestMiddleware,
  Logger,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // 🎯 Request ID for tracing logs across services
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    req.headers['x-request-id'] = requestId;

    const { method, originalUrl, ip, body } = req;

    this.logger.log(
      JSON.stringify({
        type: 'REQUEST',
        requestId,
        method,
        url: originalUrl,
        ip,
        body: this.sanitizeBody(body),
        headers: this.sanitizeHeaders(req.headers),
        timestamp: new Date().toISOString(),
      }),
    );

    // 🎯 Capture response
    res.on('finish', () => {
      const duration = Date.now() - start;

      this.logger.log(
        JSON.stringify({
          type: 'RESPONSE',
          requestId,
          method,
          url: originalUrl,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        }),
      );
    });

    // 🎯 Capture crash-level errors
    res.on('error', (err) => {
      this.logger.error(
        JSON.stringify({
          type: 'ERROR',
          requestId,
          message: err.message,
          stack: err.stack,
        }),
      );
    });

    next();
  }

  private sanitizeBody(body: any) {
    if (!body) return body;

    // avoid logging sensitive fields
    const { password, token, accessToken, refreshToken, ...safe } = body;
    return safe;
  }

  private sanitizeHeaders(headers: any) {
    const { authorization, cookie, ...safe } = headers;
    return safe;
  }
}