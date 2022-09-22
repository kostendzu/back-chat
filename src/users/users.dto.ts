import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
    @ApiProperty()
    user_id: number

    @ApiProperty()
    readonly login: string
    
    @ApiProperty()
    readonly password: string
}