// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { User } from './user.entity';
//
// @Module({
//   imports: [TypeOrmModule.forFeature([User])], // Register User entity with TypeORM
//   providers: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}
