import { Request } from 'express';
import { Users } from './entities/users.entity';

export interface UserProfile {
    id: string;
    email: string;
    verified_email: true;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export interface TokenPayload {
    user: Users;
}

export interface RequestWithUser extends Request {
    user: TokenPayload;
}
