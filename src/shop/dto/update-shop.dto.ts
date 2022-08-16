import { PartialType } from '@nestjs/swagger';
import { IsFQDN, IsInt } from 'class-validator';
import { CreateShopDto } from './create-shop.dto';

export class UpdateShopDto {
    readonly name?: string;
    readonly brand?: string;
    readonly category?: string[];
    readonly size?: string[];
    readonly color?: string[];

    @IsInt()
    readonly price?: number;

    @IsFQDN()
    readonly thumbnail?: string;

    @IsFQDN()
    readonly photos?: string[];
}
