import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  createErrorResponse,
  type Locale,
} from '@/common/utils/response.utils';
import {
  getLocalizedMessage,
  ErrorKey,
  ERROR_MESSAGES,
} from '@/common/i18n/error-messages';
import { getLocaleFromRequest } from '../utils/headers';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Get locale from request headers
    const locale = getLocaleFromRequest(
      request.headers as Record<string, unknown>,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        error = (responseObj.error as string) || exception.name;

        // Handle validation errors
        if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join(', ');
          error = 'VALIDATION_ERROR';
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }
    // Resolve error key and get localized message
    const errorKey = this.resolveErrorKey(error, message);
    const localizedMessage = this.getLocalizedMessage(
      errorKey,
      message,
      locale,
    );

    const errorResponse = createErrorResponse(
      errorKey,
      localizedMessage,
      status,
      request.url,
      {
        stack: exception instanceof Error ? exception.stack : undefined,
        originalError: exception instanceof Error ? exception.name : undefined,
        originalMessage: exception instanceof Error ? exception.message : undefined,
      },
    );

    console.log('LOGGING ERROR 🤖', errorResponse);

    response.status(status).json(errorResponse);
  }

  private resolveErrorKey(error: string, message: string): ErrorKey {
    if (ERROR_MESSAGES[error as ErrorKey]) {
      return error as ErrorKey;
    }

    const normalizedMessage = message?.toLowerCase?.() ?? '';

    const matchedEntry = Object.entries(ERROR_MESSAGES).find(([, locales]) =>
      Object.values(locales).some(
        (translation) => translation.toLowerCase() === normalizedMessage,
      ),
    );

    return (matchedEntry?.[0] as ErrorKey) || 'INTERNAL_SERVER_ERROR';
  }

  private getLocalizedMessage(
    errorKey: ErrorKey,
    defaultMessage: string,
    locale: Locale,
  ): string {
    if (ERROR_MESSAGES[errorKey]) {
      return getLocalizedMessage(errorKey, locale);
    }

    // Return default message if no localized version found
    return defaultMessage;
  }
}
