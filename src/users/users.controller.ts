import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { user } from './users.entity';
import { CreateUser } from './users.dto'
import { JwtGuard } from '../auth/auth.jwtGuard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get()
        async getAll(): Promise<user[]> {
          return  await this.userService.findAll()
        
      } 
    @UseGuards(JwtGuard)
    @Post()
    async create(@Body() user:CreateUser) : Promise<string> {
      try {
        let x = await this.userService.findAll()
        user.user_id = x.length + 1
        this.userService.create(user)
        return `${user.login} succesfully created`
      }
      catch(e){
        return e.message
      }
    }
}
