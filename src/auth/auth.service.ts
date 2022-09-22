import { Injectable , Res, Inject, CACHE_MANAGER } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserService } from '../users/users.service';
import { jwtConstants } from './auth.constants';
import { authDto } from './auth.dto';
import { Cache } from 'cache-manager'

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private userService: UserService,
        private jwtService: JwtService
      ) {}


    authForm(res: Response): any{
        console.log(process.cwd() + `src/auth/auth.html`)
        return res.sendFile(process.cwd() + `/src/auth/auth.html`)
    }

    async registration(req: authDto): Promise<any>{
        let users_list = await this.userService.findAll()
        let arr:authDto[] = []
        let b = null
        users_list.forEach((x,i) => 
         arr[i] = {
            "login" : x.login,
            "password" : x.password
        })
        arr.forEach((a) => {
            if ((a.login == req.login && a.password == req.password)) { b = a }
        })
        return b 
    }

        login(req: authDto): any{
        const userToken = {
            login: req.login, 
            accessToken: this.jwtService.sign({name: req.login}, {secret: jwtConstants.secret, expiresIn: 100}),
            refreshToken: this.jwtService.sign({name: req.login}, {secret: jwtConstants.refreshSecret, expiresIn: 1000}),
        }
        this.cacheManager.set(`${req.login} refreshToken`, userToken.refreshToken, {ttl: 1000} )
        return userToken
    }
}
