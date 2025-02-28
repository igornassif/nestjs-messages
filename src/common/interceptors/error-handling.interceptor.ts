import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof Error) {
          console.log(error.name);
          console.log(error.message);
        } else {
          console.log('Unknown error type:', error);
        }
        return throwError(() => {
          if (error instanceof Error && error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }
          return error;
        });
      }),
    );
  }
}
