import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import type { PaymentAttempt, PaymentRecord } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepo: PaymentRepository) {}

  public async createPaymentRecord(data: {
    requestReference: string;
    amount: number; // kobo
    customerId: string;
    paymentCode: string;
    metadata?: any;
  }) {
    return this.paymentRepo.createPaymentRecord({
      requestReference: data.requestReference,
      amount: data.amount,
      customerId: data.customerId,
      paymentCode: data.paymentCode,
      metadata: data.metadata ?? {},
      status: 'PENDING',
    });
  }

  public async createPaymentAttempt(params: {
    paymentRecordId: string;
    providerName: string; // friendly name like 'interswitch'
    isPrimary?: boolean;
    requestBody?: any;
  }) {
    // find provider (or create if missing)
    let provider = await this.paymentRepo.findProvider(params.providerName);
    if (!provider) {
      // TODO: add providers seed
      throw new BadRequestException('Unknown provider');
    }

    // create attempt
    const attempt = await this.paymentRepo.createPaymentAttempt({
      paymentRecordId: params.paymentRecordId,
      providerId: provider.id,
      isPrimary: params.isPrimary ?? false,
      requestBody: params.requestBody,
      retries: 0,
    });

    // optimistic: set parent record to PROCESSING
    await this.paymentRepo.updatePaymentRecord(params.paymentRecordId, {
      status: 'PROCESSING',
    });

    return attempt;
  }

  public async updatePaymentAttempt(
    attemptId: string,
    data: Pick<
      PaymentAttempt,
      | 'attemptReference'
      | 'providerResponse'
      | 'confirmedTransaction'
      | 'providerStatus'
    >,
  ) {
    return this.paymentRepo.updatePaymentAttempt(attemptId, data);
  }
  public async markAttemptSuccess(
    attemptId: string,
    payload: Pick<
      PaymentAttempt,
      | 'attemptReference'
      | 'providerResponse'
      | 'confirmedTransaction'
      | 'providerStatus'
      | 'requestBody'
    >,
  ) {
    const attempt = await this.paymentRepo.updatePaymentAttempt(
      attemptId,
      payload,
    );

    await this.paymentRepo.updatePaymentRecord(attempt.paymentRecordId, {
      status: 'PAID',
    });

    return attempt;
  }

  // 4) mark attempt failure (persist error), optionally schedule fallback
  async markAttemptFailed(
    attemptId: string,
    payload: {
      providerResponse?: any;
      lastError?: string;
      shouldFallback?: boolean;
      providerStatus?: string;
      confirmedTransaction?: any;
      attemptReference?: string;
    },
  ) {
    const attempt = await this.paymentRepo.updatePaymentAttempt(attemptId, {
      providerResponse: payload.providerResponse,
      lastError: payload.lastError ?? null,
      providerStatus: payload.providerStatus ?? 'FAILED',
      ...(payload.confirmedTransaction && {
        confirmedTransaction: payload.confirmedTransaction,
      }),
      ...(payload.attemptReference && {
        attemptReference: payload.attemptReference,
      }),
    });

    // Optionally update the parent record status to FAILED if no fallback
    if (!payload.shouldFallback) {
      await this.paymentRepo.updatePaymentRecord(attempt.paymentRecordId, {
        status: 'FAILED',
      });
    }

    return attempt;
  }

  async markAttemptPending(
    attemptId: string,
    payload: {
      providerResponse?: any;
      lastError?: string;
      providerStatus?: string;
      confirmedTransaction?: any;
      attemptReference?: string;
    },
  ) {
    const attempt = await this.paymentRepo.updatePaymentAttempt(attemptId, {
      providerResponse: payload.providerResponse,
      lastError: payload.lastError ?? null,
      providerStatus: payload.providerStatus ?? 'PENDING',
      ...(payload.confirmedTransaction && {
        confirmedTransaction: payload.confirmedTransaction,
      }),
      ...(payload.attemptReference && {
        attemptReference: payload.attemptReference,
      }),
    });

    await this.paymentRepo.updatePaymentRecord(attempt.paymentRecordId, {
      status: 'PENDING',
    });

    return attempt;
  }

  async findPaymentRecord(where: Pick<PaymentRecord, 'requestReference'>) {
    return this.paymentRepo.findPaymentRecord(where);
  }

  async findProvider(name: string) {
    return this.paymentRepo.findProvider(name);
  }
}
