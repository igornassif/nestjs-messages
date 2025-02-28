import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('Returning from cache', url);
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log('Setting to cache', url);
      }),
    );
  }
}
