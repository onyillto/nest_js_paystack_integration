// // src/auth/auth.service.ts
// import {
//   Injectable,
//   ConflictException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { RegisterUserDto } from './register-user.dto';
// import { LoginUserDto } from './login-user.dto';
//
// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}
//
//   async register(registerUserDto: RegisterUserDto): Promise<User> {
//     const { email, password } = registerUserDto;
//
//     const existingUser = await this.usersRepository.findOne({
//       where: { email },
//     });
//     if (existingUser) {
//       throw new ConflictException('User with this email already exists.');
//     }
//
//     const user = new User();
//     user.email = email;
//     await user.hashPassword(password); // Hash the password
//     await this.usersRepository.save(user);
//
//     return user;
//   }
//
//   async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
//     const { email, password } = loginUserDto;
//
//     const user = await this.usersRepository.findOne({ where: { email } });
//     if (!user || !(await user.comparePassword(password))) {
//       throw new UnauthorizedException('Invalid credentials.');
//     }
//     const accessToken = `dummy-jwt-token-for-user-${user.id}`; // Placeholder
//     return { accessToken };
//   }
// }
