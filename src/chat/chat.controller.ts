import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { async } from 'rxjs';
import { JwtGuard } from '../auth/auth.jwtGuard';
import { chatDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtGuard)
    @Get()
    async getAll(){
        return await this.chatService.getAll()
    }
    
    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() message: chatDto){
        return await this.chatService.create(message)
    }

    @Post()
    async checkOnline(@Body() login: {"login" : string}){
        await this.chatService.checkOnline(login.login)
    }
}
