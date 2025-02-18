import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      this.throwNotFoundError();
    }

    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    if (!message) {
      this.throwNotFoundError();
    }

    await this.messageRepository.save(message);

    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessageDto = {
      read: updateMessageDto?.read,
      text: updateMessageDto?.text,
    };

    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });

    if (!message) {
      return this.throwNotFoundError();
    }

    await this.messageRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({
      id,
    });

    if (!message) {
      return this.throwNotFoundError();
    }

    if (message) {
      return this.messageRepository.remove(message);
    }
  }
}
