import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'src/shared/interface/token.interface';
import { UserDatas } from 'src/shared/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService
    ) { }
    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const generateTokens= this.getTokens(user.id,user.email)
        return generateTokens;
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<UserDatas> {
        const { email, password } = authLoginDto;

        const user = await this.userService.findByEmail(email);
        if (!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
          sub: userId,
          email: email,
        };
        const [at, rt] = await Promise.all([
          this.jwtService.sign(jwtPayload, {
            secret: process.env.JWT_SECRET ,
            expiresIn: '15m',
          }),
          this.jwtService.sign(jwtPayload, {
            secret:  process.env.JWT_SECRET,
            expiresIn: '7d',
          }),
        ]);
        return {
            access_tokens: at,
            refresh_tokens: rt,
        };
      }
    }




