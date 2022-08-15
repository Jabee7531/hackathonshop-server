import { IsFQDN, IsInt } from 'class-validator';

export class CreateShopDto {
    readonly name!: string;
    readonly brand!: string;
    readonly category!: string[];
    readonly size!: string[];
    readonly color!: string[];

    @IsInt()
    readonly price!: number;

    @IsFQDN()
    readonly thumbnail?: string;

    @IsFQDN()
    readonly photos?: string[];
}
