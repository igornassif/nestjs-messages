import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly personsService: PersonsService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    const messages = await this.messageRepository.find({
      relations: ['from', 'to'],
      order: { id: 'DESC' },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (!message) {
      // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      this.throwNotFoundError();
    }

    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;

    const fromPerson = await this.personsService.findOne(fromId);

    const toPerson = await this.personsService.findOne(toId);

    const newMessage = {
      text: createMessageDto.text,
      from: fromPerson,
      to: toPerson,
      read: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);
    await this.messageRepository.save(message);

    return {
      ...message,
      from: {
        id: fromPerson.id,
        name: fromPerson.name,
      },
      to: {
        id: toPerson.id,
        name: toPerson.name,
      },
    };
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

    return await this.messageRepository.remove(message);
  }
}
