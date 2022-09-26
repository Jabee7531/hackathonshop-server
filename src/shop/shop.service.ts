import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { PaymentDto } from './dto/payment.dto';
import { QueryShopDto } from './dto/query-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Products } from './entities/shop.entity';
import { ShopQuery } from './query/shop.query';

@Injectable()
export class ShopService {
    constructor(
        private shopQuery: ShopQuery,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        private config: ConfigService,
    ) {}

    async create(
        createShopDto: CreateShopDto,
    ): Promise<Products> {
        // DB에 상품 추가
        const product =
            await this.shopQuery.createProductQuery(
                createShopDto,
            );

        return product;
    }

    async creates(
        createsShopDto: CreateShopDto[],
    ): Promise<Products[]> {
        // DB에 상품 여러개 추가
        const products =
            await this.shopQuery.createsProductQuery(
                createsShopDto,
            );

        return products;
    }

    async findAll(): Promise<Products[]> {
        // 상품 목록 전체 조회
        const products =
            await this.productsRepository.find(
                {},
            );

        return products;
    }

    async findOne(id: string): Promise<Products> {
        // 상품 하나 조회
        const product =
            await this.productsRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );
        return product;
    }

    async findQuery(
        productQueryDto: QueryShopDto,
    ): Promise<Products[]> {
        // 상품 쿼리 조회
        const qb =
            this.productsRepository.createQueryBuilder(
                'products',
            );
        if (productQueryDto.brand)
            qb.andWhere(
                'products.brand IN (:...brands)',
                {
                    brands: productQueryDto.brand,
                },
            );
        if (productQueryDto.category)
            qb.andWhere(
                ":category && string_to_array(products.category, ',')",
                {
                    category:
                        productQueryDto.category,
                },
            );
        if (productQueryDto.color)
            qb.andWhere(
                ":color && string_to_array(products.color, ',')",
                {
                    color: productQueryDto.color,
                },
            );
        if (productQueryDto.minPrice)
            qb.andWhere(
                'products.price >= :min',
                {
                    min: +productQueryDto.minPrice,
                },
            );
        if (productQueryDto.maxPrice)
            qb.andWhere(
                'products.price <= :max',
                {
                    max: +productQueryDto.maxPrice,
                },
            );
        if (productQueryDto.size)
            qb.andWhere(
                ":size && string_to_array(products.size, ',')",
                {
                    size: productQueryDto.size,
                },
            );

        const products = await qb.getMany();

        return products;
    }

    async update(
        id: string,
        updateShopDto: UpdateShopDto,
    ): Promise<Products> {
        // 업데이트할 상품 조회
        const product =
            await this.productsRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        // 상품 업데이트
        const updatedProduct =
            await this.shopQuery.updateProductQuery(
                updateShopDto,
                product,
            );

        return updatedProduct;
    }

    async remove(id: string): Promise<Products> {
        // 삭제할 상품 조회
        const product =
            await this.productsRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        // 상품 삭제
        const deletedProduct =
            await this.shopQuery.deleteProductQuery(
                product,
            );

        return deletedProduct;
    }

    // TossPayment 유효성 확인
    async checkPayment(
        paymentDto: PaymentDto,
    ): Promise<AxiosResponse<any, any>> {
        const secretKey = this.config.get(
            'Payment_SecretKey',
        );
        try {
            const toss = await axios.post(
                'https://api.tosspayments.com/v1/payments/' +
                    paymentDto.paymentKey,
                {
                    orderId: paymentDto.orderId,
                    amount: paymentDto.amount,
                },
                {
                    headers: {
                        Authorization:
                            'Basic ' +
                            Buffer.from(
                                secretKey + ':',
                            ).toString('base64'),
                        'Content-Type':
                            'application/json',
                    },
                    responseType: 'json',
                },
            );

            return toss;
        } catch (e) {
            throw new BadRequestException(
                '400002',
            );
        }
    }
}
