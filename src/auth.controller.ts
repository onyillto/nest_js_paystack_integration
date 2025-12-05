// // src/auth/auth.controller.ts
// import {
//   Controller,
//   Post,
//   Body,
//   ValidationPipe,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterUserDto } from './register-user.dto';
// import { LoginUserDto } from './login-user.dto';
// import { User } from './user.entity';
// import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
//
// @ApiTags('Auth') // Tags for Swagger documentation
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
//
//   @Post('register')
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiResponse({
//     status: HttpStatus.CREATED,
//     description: 'User successfully registered.',
//     type: User,
//   })
//   @ApiResponse({
//     status: HttpStatus.CONFLICT,
//     description: 'User with this email already exists.',
//   })
//   @HttpCode(HttpStatus.CREATED)
//   async register(
//     @Body(ValidationPipe) registerUserDto: RegisterUserDto,
//   ): Promise<Partial<User>> {
//     const user = await this.authService.register(registerUserDto);
//     const { passwordHash, ...result } = user; // Exclude password hash from response
//     return result;
//   }
//
//   @Post('login')
//   @ApiOperation({ summary: 'Log in an existing user' })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'User successfully logged in.',
//   })
//   @ApiResponse({
//     status: HttpStatus.UNAUTHORIZED,
//     description: 'Invalid credentials.',
//   })
//   @HttpCode(HttpStatus.OK)
//   async login(
//     @Body(ValidationPipe) loginUserDto: LoginUserDto,
//   ): Promise<{ accessToken: string }> {
//     return this.authService.login(loginUserDto);
//   }
// }
