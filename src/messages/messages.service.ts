import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;

  private messages = [
    {
      id: 1,
      text: 'Hello world!',
      from: 'John',
      to: 'Doe',
      read: false,
      date: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find((message) => message.id === id);

    if (!message) {
      // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      this.throwNotFoundError();
    }

    return message;
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;

    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === +id,
    );

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const existingMessage = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...existingMessage,
      ...updateMessageDto,
    };

    return this.messages[messageIndex];
  }

  remove(id: number) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    this.messages.splice(messageIndex, 1);
  }
}
