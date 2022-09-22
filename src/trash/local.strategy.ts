import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { authDto } from "../auth/auth.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async registration(auth: authDto): Promise<any> {
        const user = await this.authService.registration(auth)
        if (!user) {
            throw new UnauthorizedException()
        }
        console.log(user, auth);
        return user
    }
}