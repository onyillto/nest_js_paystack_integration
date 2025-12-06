/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/paystack/paystack.service.ts
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { InitializePaymentDto } from './initialize-payment.dto';
import { AxiosError } from 'axios';

// Interfaces for Paystack API responses for better type safety
export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: any; // The data object for verification is large and can be typed further if needed
}
@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);
  private readonly paystackSecretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) {
      throw new InternalServerErrorException(
        'PAYSTACK_SECRET_KEY not found in environment variables.',
      );
    }
    this.paystackSecretKey = secretKey;
  }

  async initializePayment(
    initializePaymentDto: InitializePaymentDto,
  ): Promise<PaystackInitializeResponse> {
    const { email, amount } = initializePaymentDto;
    const url = 'https://api.paystack.co/transaction/initialize';

    // Paystack amount is in kobo (lowest currency unit)
    const amountInKobo = amount * 100;

    // The URL Paystack will redirect to after payment.
    const callback_url = 'http://localhost:3000/paystack/callback';

    const headers = {
      Authorization: `Bearer ${this.paystackSecretKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<PaystackInitializeResponse>(
          url,
          { email, amount: amountInKobo, callback_url },
          { headers },
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.logger.error(
          `Error initializing payment: ${JSON.stringify(error.response.data)}`,
        );
      } else if (error instanceof Error) {
        this.logger.error(
          'An unexpected error occurred during payment initialization',
          error.stack,
        );
      }
      throw new InternalServerErrorException('Could not initialize payment.');
    }
  }

  async verifyPayment(reference: string): Promise<PaystackVerifyResponse> {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = {
      Authorization: `Bearer ${this.paystackSecretKey}`,
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PaystackVerifyResponse>(url, { headers }),
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.logger.error(
          `Error verifying payment: ${JSON.stringify(error.response.data)}`,
        );
      } else if (error instanceof Error) {
        this.logger.error(
          'An unexpected error occurred during payment verification',
          error.stack,
        );
      }
      throw new InternalServerErrorException('Could not verify payment.');
    }
  }
}
