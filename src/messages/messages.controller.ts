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
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimmingConnectionInterceptor } from 'src/common/interceptors/timming-connection.interceptor';
// import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';

@Controller('messages')
@UsePipes(ParseIntIdPipe)
@UseInterceptors(AddHeaderInterceptor) //ErrorHandlingInterceptor
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseInterceptors(TimmingConnectionInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.messagesService.findAll(paginationDto);
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
