import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { UserProfile } from '../../../users/users.interface';

@Injectable()
export class GoogleAuthService {
    constructor() {}

    async getGoogleProfile(
        accessToken: string,
    ): Promise<UserProfile> {
        try {
            // Google AccessToken을 사용하여 사용자 정보 조회
            const profile = await axios.get(
                'https://www.googleapis.com/userinfo/v2/me',
                {
                    params: {
                        access_token: accessToken,
                    },
                },
            );

            return profile.data;
        } catch {
            // 조회 데이터가 없으면 예외처리
            throw new UnauthorizedException(
                '401001',
            );
        }
    }
}
