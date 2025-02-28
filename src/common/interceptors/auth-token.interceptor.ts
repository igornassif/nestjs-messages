import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IncomingMessage } from 'http';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<IncomingMessage>();
    const token = request.headers.authorization?.split(' ')[1];

    console.log(request);

    console.log('Token:', token);

    return next.handle();
  }
}
