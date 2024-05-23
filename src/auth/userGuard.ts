/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class userGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return false;
        }
        const token = authHeader.split(' ')[1];
        return this.userService.validateToken(token).then(result => Boolean(result));
    }
}