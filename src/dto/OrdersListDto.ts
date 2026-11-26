export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface MoneyDto {
  /** Decimal amount in the given currency (OpenAPI number). */
  amount: number;
  currency: string;
}

export interface OrderSummaryDto {
  orderNumber: string;

  /** @format date-time */
  placedAt: string;

  status: OrderStatus;
  total: MoneyDto;

  /** @format integer */
  itemCount: number;

  trackingNumber?: string;

  /** @format date */
  estimatedDelivery?: string;

  cancellationReason?: string | null;
}

export interface OrdersListResponseDto {
  items: OrderSummaryDto[];

  /** @format integer */
  page: number;

  /**
   * Fixed at 10.
   * @format integer
   */
  pageSize: number;

  /** @format integer */
  totalItems: number;

  /**
   * Page number of the next page. Null on the last page.
   * @format integer
   */
  nextPage: number | null;
}
