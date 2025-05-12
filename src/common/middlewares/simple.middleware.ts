import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello from SimpleMiddleware!');

    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        name: 'John Doe',
      };
    }

    res.setHeader('Middleware-Header', 'From Middleware');

    next();
  }
}
