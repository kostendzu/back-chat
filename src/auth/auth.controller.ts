import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { authDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { NewGuard  } from './auth.newGuard';
import { JwtGuard } from './auth.jwtGuard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtGuard)
    @Get()
    authForm(@Res() res: Response) : Response<any>{
        return this.authService.authForm(res)
    }
    

     @UseGuards(NewGuard)
     @Post()
      async  getJwtToken(@Body() auth: authDto ) : Promise<any> {
        return await this.authService.login(auth)
      }
        
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('update')
        async updateJwtToken(@Body() auth: authDto) : Promise<any>{
            return await this.authService.login(auth)
        }
    
}


