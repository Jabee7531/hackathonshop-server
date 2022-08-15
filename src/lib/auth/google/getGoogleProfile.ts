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
            throw new UnauthorizedException(
                '401001',
            );
        }
    }
}
