import { ApiProperty } from '@nestjs/swagger';

export class authDto {
    @ApiProperty()
    readonly login: string
    
    @ApiProperty()
    readonly password: string
}