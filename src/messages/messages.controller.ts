import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseInterceptors(AuthTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = await this.messagesService.findAll(paginationDto);

    throw new BadRequestException(
      'This is a custom error message for demonstration purposes.');
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.messagesService.findOne(id);
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.messagesService.remove(id);
  }
}
