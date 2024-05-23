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
        const token = request.headers['authorization'];
        if (!token) {
            return false;
        }
        return this.userService.validateToken(token).then(result => Boolean(result));
    }
}
