## User

Generate TypeScript DTO interfaces for this OpenAPI schema.\
Follow this convention strictly:\
\- Interface names: PascalCase + "Dto" suffix. Every schema object gets its own interface.\
\- Enums: exported string literal union type aliases — never \`string\`.\
\- Optionality: a property NOT in the \`required\` array gets \`?\`. Nothing else does.\
\- Nullability: \`nullable: true\` adds \`| null\` — independent of \`required\`.\
\- Formats: add a JSDoc comment for uuid, date-time, date, uri, integer and float.\
\- Never add a field that is not in the schema.\
\
*# Source: TechShop OpenAPI 3.0 spec*\
*# Endpoint: GET /orders*\
*# Schema: OrdersListResponse (paginated list of the current user's orders)*\
\
components:\
&#x20; schemas:\
\
&#x20;   OrderStatus:\
&#x20;     type: string\
&#x20;     enum:\
&#x20;       \- pending\
&#x20;       \- confirmed\
&#x20;       \- processing\
&#x20;       \- shipped\
&#x20;       \- delivered\
&#x20;       \- cancelled\
\
&#x20;   Money:\
&#x20;     type: object\
&#x20;     required:\
&#x20;       \- amount\
&#x20;       \- currency\
&#x20;     properties:\
&#x20;       amount:\
&#x20;         type: number\
&#x20;         description: Decimal amount in the given currency\
&#x20;       currency:\
&#x20;         type: string\
&#x20;         description: ISO 4217 code, e.g. GBP\
\
&#x20;   OrderSummary:\
&#x20;     type: object\
&#x20;     required:\
&#x20;       \- orderNumber\
&#x20;       \- placedAt\
&#x20;       \- status\
&#x20;       \- total\
&#x20;       \- itemCount\
&#x20;     properties:\
&#x20;       orderNumber:\
&#x20;         type: string\
&#x20;         description: Human-readable order reference, e.g. TS-240311-7731\
&#x20;       placedAt:\
&#x20;         type: string\
&#x20;         format: date-time\
&#x20;       status:\
&#x20;         $ref: '#/components/schemas/OrderStatus'\
&#x20;       total:\
&#x20;         $ref: '#/components/schemas/Money'\
&#x20;       itemCount:\
&#x20;         type: integer\
&#x20;       trackingNumber:\
&#x20;         type: string\
&#x20;         description: Carrier tracking reference, assigned after dispatch\
&#x20;       estimatedDelivery:\
&#x20;         type: string\
&#x20;         format: date\
&#x20;       cancellationReason:\
&#x20;         type: string\
&#x20;         nullable: true\
\
&#x20;   OrdersListResponse:\
&#x20;     type: object\
&#x20;     required:\
&#x20;       \- items\
&#x20;       \- page\
&#x20;       \- pageSize\
&#x20;       \- totalItems\
&#x20;       \- nextPage\
&#x20;     properties:\
&#x20;       items:\
&#x20;         type: array\
&#x20;         items:\
&#x20;           $ref: '#/components/schemas/OrderSummary'\
&#x20;       page:\
&#x20;         type: integer\
&#x20;       pageSize:\
&#x20;         type: integer\
&#x20;         description: Fixed at 10\
&#x20;       totalItems:\
&#x20;         type: integer\
&#x20;       nextPage:\
&#x20;         type: integer\
&#x20;         nullable: true\
&#x20;         description: Page number of the next page; null on the last page\
\

## Assistant

```ts
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface MoneyDto {
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
   * Next page number, or null on the last page.
   * @format integer
   */
  nextPage: number | null;
}
```