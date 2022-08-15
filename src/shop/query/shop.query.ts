import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { Products } from '../entities/shop.entity';

@Injectable()
export class ShopQuery {
    constructor(private dataSource: DataSource) {}

    async createProductQuery(
        createShopDto: CreateShopDto,
    ): Promise<Products> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const product = new Products();

            product.name = createShopDto.name;
            product.category =
                createShopDto.category;
            product.price = createShopDto.price;
            product.size = createShopDto.size;
            product.color = createShopDto.color;
            product.brand = createShopDto.brand;
            if (createShopDto.thumbnail) {
                product.thumbnail =
                    createShopDto.thumbnail;
            }
            if (createShopDto.photos) {
                product.photos =
                    createShopDto.photos;
            }

            await queryRunner.manager.save(
                product,
            );

            await queryRunner.commitTransaction();

            return product;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async createsProductQuery(
        createsShopDto: CreateShopDto[],
    ): Promise<Products[]> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            var products = [];
            for (
                var i = 0;
                i < createsShopDto.length;
                i++
            ) {
                const product = new Products();

                product.name =
                    createsShopDto[i].name;
                product.category =
                    createsShopDto[i].category;
                product.price =
                    createsShopDto[i].price;
                product.size =
                    createsShopDto[i].size;
                product.color =
                    createsShopDto[i].color;
                product.brand =
                    createsShopDto[i].brand;
                if (createsShopDto[i].thumbnail) {
                    product.thumbnail =
                        createsShopDto[
                            i
                        ].thumbnail;
                }
                if (createsShopDto[i].photos) {
                    product.photos =
                        createsShopDto[i].photos;
                }

                await queryRunner.manager.save(
                    product,
                );

                products.push(product);
            }

            await queryRunner.commitTransaction();

            return products;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async updateProductQuery(
        updateShopDto: UpdateShopDto,
        product: Products,
    ): Promise<Products> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateShopDto.name) {
                product.name = updateShopDto.name;
            }
            if (updateShopDto.category) {
                product.category =
                    updateShopDto.category;
            }
            if (updateShopDto.price) {
                product.price =
                    updateShopDto.price;
            }
            if (updateShopDto.size) {
                product.size = updateShopDto.size;
            }
            if (updateShopDto.color) {
                product.color =
                    updateShopDto.color;
            }
            if (updateShopDto.brand) {
                product.brand =
                    updateShopDto.brand;
            }
            if (updateShopDto.thumbnail) {
                product.thumbnail =
                    updateShopDto.thumbnail;
            }
            if (updateShopDto.photos) {
                product.photos =
                    updateShopDto.photos;
            }

            const updatedProduct =
                await queryRunner.manager.save(
                    product,
                );

            await queryRunner.commitTransaction();

            return updatedProduct;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async deleteProductQuery(
        product: Products,
    ): Promise<Products> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result =
                await queryRunner.manager.remove(
                    product,
                );

            await queryRunner.commitTransaction();

            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }
}
