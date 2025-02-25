import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        email: createPersonDto.email,
        passwordHash: createPersonDto.password,
      };

      const newPerson = this.personRepository.create(personData);
      await this.personRepository.save(newPerson);
      return newPerson;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as QueryFailedError & { code: string }).code === '23505'
      ) {
        throw new ConflictException('Email already in use');
      }

      throw error;
    }
  }

  async findAll() {
    const persons = await this.personRepository.find({
      order: { createdAt: 'DESC' },
    });

    return persons;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      name: updatePersonDto.name,
      passwordHash: updatePersonDto.password,
    };

    const person = await this.personRepository.preload({
      id,
      ...personData,
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return await this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    await this.personRepository.remove(person);
  }
}
