import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const hashPass = await hash(pass, 13);
    const user = await this.usersService.getUser(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (!compare(user.password, hashPass)) {
      throw new UnauthorizedException();
    }

    const payload = {
      name: user.name,
      lastName: user.lastname,
      userEmail: user.email,
      rut: user.rut,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
