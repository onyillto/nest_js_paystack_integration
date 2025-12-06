/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/paystack/paystack.controller.ts
import { Controller, Post, Get, Body, Param, Query, Res } from '@nestjs/common';
import {
  PaystackInitializeResponse,
  PaystackService,
  PaystackVerifyResponse,
} from './paystack.service';
import { InitializePaymentDto } from './initialize-payment.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

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
    @Body() initializePaymentDto: InitializePaymentDto,
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

  @Get('callback')
  @ApiOperation({
    summary: 'Handle Paystack callback for transaction verification',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to a success or failure page.',
  })
  async handleCallback(
    @Query('reference') reference: string,
    @Res() res: Response,
  ): Promise<void> {
    const verification = await this.paystackService.verifyPayment(reference);

    //  success/failure routes based on verification status
    if (verification?.data?.status === 'success') {
      // Redirect to a success page
      res.redirect(`/paystack/payment-success?ref=${reference}`);
    } else {
      // Redirect to a failure page
      res.redirect(`/paystack/payment-failure?ref=${reference}`);
    }
  }

  @Get('payment-success')
  @ApiOperation({ summary: 'Display a payment success message' })
  paymentSuccess(@Query('ref') ref: string) {
    return {
      message: 'Payment successful!',
      reference: ref,
    };
  }

  @Get('payment-failure')
  @ApiOperation({ summary: 'Display a payment failure message' })
  paymentFailure(@Query('ref') ref: string) {
    return {
      message: 'Payment failed or was cancelled.',
      reference: ref,
    };
  }
}
