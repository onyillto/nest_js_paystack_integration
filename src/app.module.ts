/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { User } from './user.entity'; // Import the User entity
// import { AuthModule } from './auth.module'; // Import the AuthModule
import { PaystackModule } from './paystack.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available throughout the app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'paystack_db',
      entities: [
        /* User */
      ], // Add your entities here, User is commented out
      synchronize: true, // WARNING: Set to false in production. This creates/updates tables automatically.
    }),
    // AuthModule, // Include the AuthModule
    PaystackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} // Keep the name as AppModule
