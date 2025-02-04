import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any){
        return {
            id,
            ...body
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return `Deleted message id: ${id}`;
    }

}
