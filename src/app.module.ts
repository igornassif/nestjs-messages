import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { SimpleMiddleware } from './common/middlewares/simple.middleware';
import { AnotherMiddleware } from './common/middlewares/another.middleware';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './common/filters/my-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'admin',
      autoLoadEntities: true,
      synchronize: true, // Don't use this in production
    }),
    MessagesModule,
    PersonsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware, AnotherMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    console.log('AppModule configured');
  }
}
