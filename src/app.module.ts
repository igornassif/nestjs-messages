import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';

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
  providers: [],
})
export class AppModule {}
