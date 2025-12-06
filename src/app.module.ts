import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaystackModule } from './paystack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available throughout the app
      envFilePath: '.env', // Point to the .env file in the parent directory
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT || '5432', 10),
    //   username: process.env.DB_USERNAME || 'postgres',
    //   password: process.env.DB_PASSWORD || 'postgres',
    //   database: process.env.DB_DATABASE || 'paystack_db',
    //   entities: [], // Add your entities here
    //   synchronize: true, // WARNING: Set to false in production. This creates/updates tables automatically.
    // }),
    PaystackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
