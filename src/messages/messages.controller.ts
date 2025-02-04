import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

    @Post()
    create(@Body() body: any){        
        return body;
    }
}
