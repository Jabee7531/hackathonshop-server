import { IsInt, IsUUID } from 'class-validator';

export class PaymentDto {
    @IsUUID('4')
    readonly orderId!: string;
    readonly paymentKey!: string;
    @IsInt()
    readonly amount!: number;
}
