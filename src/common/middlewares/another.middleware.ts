import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class AnotherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello from AnotherMiddleware!');

    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        name: 'John Doe',
      };
    }

    res.setHeader('Another-Middleware-Header', 'From Another Middleware');

    next();
  }
}
