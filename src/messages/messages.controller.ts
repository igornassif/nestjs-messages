import { Controller } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    findAll(){ 
        return 'This endpoint returns all messages';
    }

    findOne(){
        return 'This endpoint returns one message';
    }
}
