/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, NotFoundException } from '@nestjs/common';

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

  findOne(id: string) {
    const message = this.messages.find((message) => message.id === +id);

    if (!message) {
      // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      this.throwNotFoundError();
    }

    return message;
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, body: any) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === +id,
    );

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    const existingMessage = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...existingMessage,
      ...body,
    };

    return this.messages[messageIndex];
  }

  remove(id: string) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === +id,
    );

    if (messageIndex < 0) {
      this.throwNotFoundError();
    }

    this.messages.splice(messageIndex, 1);
  }
}
