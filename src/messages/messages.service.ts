/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';

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

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((message) => message.id === +id);
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

    if (messageIndex >= 0) {
      const existingMessage = this.messages[messageIndex];

      this.messages[messageIndex] = {
        ...existingMessage,
        ...body,
      };
    }

    return this.messages[messageIndex];
  }

  remove(id: string) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === +id,
    );

    if (messageIndex >= 0) {
      this.messages.splice(messageIndex, 1);
    }
  }
}
