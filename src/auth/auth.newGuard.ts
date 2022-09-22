import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class NewGuard implements CanActivate {
     constructor(private authService: AuthService){}
   

  async canActivate(context: ExecutionContext): Promise<any> {
        const request  = context.switchToHttp().getRequest()
        let auth = await this.authService.registration(request.body);
        if (auth) return true;
        else throw new UnauthorizedException()
    }
}