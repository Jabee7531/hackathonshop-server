import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsIn } from 'class-validator';

export class SignUpUserDto {
    @Matches(
        /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]{2,10}$/,
    )
    @ApiProperty({
        description:
            '정규식 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]{2,10}$/',
    })
    readonly nickName: string;
    readonly accessToken: string;
    @IsIn(['google'])
    readonly provider: string;
}
