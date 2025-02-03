import { Controller, Get, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    findAll(){ 
        return 'This endpoint returns all messages';
    }

    @Get(':id')
    findOne(@Param('id') id: string){        
        return `Message id: ${id}`;
    }
}
