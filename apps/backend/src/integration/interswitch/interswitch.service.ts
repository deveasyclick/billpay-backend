import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Config } from 'src/config/configuration';
import type {
  BillerCategoriesResponse,
  BillerCategoryResponse,
  PaymentItemsResponse,
  PayObject,
  PayResponse,
  ValidateCustomersResponse,
} from './types';

interface StoredToken {
  access_token: string;
  token_type: string;
  expiry: number; // timestamp in ms
}
const TOKEN_KEY = 'auth:interswitch-basic-token';

@Injectable()
export class InterSwitchService {
  private pendingTokenPromise: Promise<string> | null = null;
  constructor(
    private readonly config: ConfigService<Config>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private async secureFetch(url: string, method: string, body?: any) {
    const token = await this.getToken();
    return await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        TERMINALID: this.config.get('interswitchTerminalId')!,
        ...(method === 'POST' && {
          'Content-Type': 'application/json',
        }),
      },
      ...(method === 'POST' && {
        body: JSON.stringify(body),
      }),
    });
  }
  private async getToken(): Promise<string> {
    const tokenData: string | undefined =
      await this.cacheManager.get(TOKEN_KEY);
    if (tokenData) {
      const token: StoredToken = JSON.parse(tokenData);
      if (Date.now() < token.expiry) {
        return token.access_token;
      }
    }

    this.pendingTokenPromise = (async () => {
      const response = await fetch(this.config.get('interswitchAuthUrl')!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${this.config.get('interswitchBasicToken')!}`,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new HttpException(
          { statusCode: response.status, message: errorBody },
          response.status,
        );
      }

      const data: Omit<StoredToken, 'expiry'> & { expires_in: number } =
        await response.json();
      if (!data.access_token || !data.expires_in) {
        throw new Error('Invalid token response');
      }
      const token: StoredToken = {
        access_token: data.access_token,
        token_type: data.token_type,
        expiry: Date.now() + data.expires_in * 1000, // expires_in in seconds
      };

      await this.cacheManager.set(TOKEN_KEY, JSON.stringify(token));

      return token.access_token;
    })();

    try {
      return await this.pendingTokenPromise;
    } finally {
      // Reset the pending promise so future calls can fetch again when needed
      this.pendingTokenPromise = null;
    }
  }

  async getBillersByCategory(): Promise<BillerCategoriesResponse> {
    const response = await this.secureFetch(
      `${this.config.get('interswitchApiBaseUrl')!}/quicktellerservice/api/v5/services/categories`,
      'GET',
    );
    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpException(
        { statusCode: response.status, message: errorBody },
        response.status,
      );
    }

    return await response.json();
  }

  async getBillerCategory(categoryId: number): Promise<BillerCategoryResponse> {
    const response = await this.secureFetch(
      `${this.config.get('interswitchApiBaseUrl')!}/quicktellerservice/api/v5/services?categoryId=${categoryId}`,
      'GET',
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpException(
        { statusCode: response.status, message: errorBody },
        response.status,
      );
    }

    return await response.json();
  }

  /**
   *
   * @param serviceId  from the biller category
   * @returns
   */
  async getBillerPaymentItems(
    serviceId: string,
  ): Promise<PaymentItemsResponse> {
    const response = await this.secureFetch(
      `${this.config.get('interswitchApiBaseUrl')!}/quicktellerservice/api/v5/services/options?serviceId=${serviceId}`,
      'GET',
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpException(
        { statusCode: response.status, message: errorBody },
        response.status,
      );
    }

    return await response.json();
  }

  /**
   *
   * @param customerId // user phone number or dstv number
   * @param paymentCode // Gotten from payment item
   * @returns
   */
  async validateCustomer(
    customerId: string,
    paymentCode: string,
  ): Promise<ValidateCustomersResponse> {
    const body = {
      customers: [
        {
          paymentCode,
          customerId,
        },
      ],
      terminalId: this.config.get('interswitchTerminalId'),
    };
    const response = await this.secureFetch(
      `${this.config.get('interswitchApiBaseUrl')!}/quicktellerservice/api/v5/Transactions/validatecustomers`,
      'POST',
      body,
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.log('error body', errorBody);
      throw new HttpException(
        { statusCode: response.status, message: errorBody },
        response.status,
      );
    }

    return await response.json();
  }

  async pay({
    customerId,
    paymentCode,
    amount,
    requestReference,
  }: PayObject): Promise<PayResponse> {
    const body = {
      paymentCode,
      customerId,
      customerMobile: customerId,
      amount,
      requestReference: `${this.config.get(
        'interswitchPaymentReferencePrefix',
      )}${requestReference}`,
    };

    const response = await this.secureFetch(
      `${this.config.get('interswitchApiBaseUrl')!}/quicktellerservice/api/v5/Transactions`,
      'POST',
      body,
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.log('error body', errorBody);
      throw new HttpException(
        { statusCode: response.status, message: errorBody },
        response.status,
      );
    }

    return await response.json();
  }
}
