import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SocialAccounts } from '../entities/socialAccounts.entity';
import { Users } from '../entities/users.entity';
import { UserProfile } from '../users.interface';

@Injectable()
export class UserQuery {
    constructor(private dataSource: DataSource) {}

    async createUserQuery(
        nickName: string,
        userProfile: UserProfile,
    ): Promise<Users> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = new Users();
            user.nick_name = nickName;
            user.email = userProfile.email;
            user.is_certified =
                userProfile.verified_email;

            const socialAcount =
                new SocialAccounts();
            socialAcount.provider = 'google';
            socialAcount.social_id =
                userProfile.id;
            socialAcount.user = user;

            await queryRunner.manager.save(user);

            await queryRunner.manager.save(
                socialAcount,
            );

            await queryRunner.commitTransaction();

            return user;
        } catch (e) {
            console.log('error');
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            console.log('fin');
            await queryRunner.release();
        }
    }

    async deleteUserQuery(
        user: Users,
    ): Promise<Users> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result =
                await queryRunner.manager.remove(
                    user,
                );

            await queryRunner.commitTransaction();

            return result;
        } catch (e) {
            console.log('error');
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            console.log('fin');
            await queryRunner.release();
        }
    }
}
