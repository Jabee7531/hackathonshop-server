import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class QueryShopDto {
    @ApiProperty({ required: false })
    readonly category: string[];
    @ApiProperty({ required: false })
    readonly size: string[];
    @ApiProperty({ required: false })
    readonly color: string[];
    @ApiProperty({ required: false })
    readonly brand: string[];

    @ApiProperty({ required: false })
    readonly minPrice: string;

    @ApiProperty({ required: false })
    readonly maxPrice: string;
}
