import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = isHttp
      ? (exception.getResponse() as any)
      : { message: 'Internal server error' };

    const message =
      (typeof errorResponse === 'string'
        ? errorResponse
        : errorResponse.message) || 'Internal server error';

    const path = request.url;

    this.logger.error(
      `HTTP ${status} - ${message} - ${request.method} ${path}`,
      (exception as any)?.stack,
    );

    response.status(status).send({
      statusCode: status,
      message,
      path,
      timestamp: new Date().toISOString(),
    });
  }
}


