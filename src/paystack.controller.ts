// src/paystack/paystack.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import {
  PaystackInitializeResponse,
  PaystackService,
  PaystackVerifyResponse,
} from './paystack.service';
import { InitializePaymentDto } from './initialize-payment.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Paystack')
@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  @ApiOperation({ summary: 'Initialize a payment transaction' })
  @ApiResponse({
    status: 201,
    description: 'Payment initialized successfully.',
  })
  initializePayment(
    @Body(ValidationPipe) initializePaymentDto: InitializePaymentDto,
  ): Promise<PaystackInitializeResponse> {
    return this.paystackService.initializePayment(initializePaymentDto);
  }

  @Post('initialize/dummy')
  @ApiOperation({ summary: 'Initialize a payment with dummy data' })
  @ApiResponse({
    status: 201,
    description: 'Dummy payment initialized successfully.',
  })
  initializeDummyPayment(): Promise<PaystackInitializeResponse> {
    const dummyData: InitializePaymentDto = {
      email: 'customer@example.com',
      amount: 5000, // 50.00 in major currency unit
    };
    return this.paystackService.initializePayment(dummyData);
  }

  @Get('verify/:reference')
  @ApiOperation({ summary: 'Verify a payment transaction' })
  @ApiParam({ name: 'reference', description: 'The transaction reference' })
  @ApiResponse({ status: 200, description: 'Payment verification status.' })
  verifyPayment(
    @Param('reference') reference: string,
  ): Promise<PaystackVerifyResponse> {
    return this.paystackService.verifyPayment(reference);
  }
}
