# Review notes — Stage 3

## Before generating

- `Money` required fields: `amount`, `currency`. Neither is nullable.
- `OrderSummary` required fields: `orderNumber`, `placedAt`, `status`, `total`, `itemCount`. The nullable field is `cancellationReason`, which is optional.
- `OrdersListResponse` required fields: `items`, `page`, `pageSize`, `totalItems`, `nextPage`. The nullable field is `nextPage`.
- Required and nullable: `nextPage: number | null`. The key is present even on the last page.
- Looks required: `trackingNumber` is documented as a carrier reference assigned after dispatch, and it is absent from `required`. Its declaration is `trackingNumber?: string`.

## Defects found

The Claude draft matched the wire contract for all fields, including `nextPage` and `trackingNumber`. The final DTO adds JSDoc to `MoneyDto.amount` to document its decimal `number` representation.

## Control pass

| Field | Category | Correct representation |
| --- | --- | --- |
| `shippingAddress.county` | Dropped field | `county?: string` in `ShippingAddressResponseDto`. |
| `loyaltyPointsEarned` | Invented field | Omit it from `OrderResponseDto`. |
| `appliedPromoCode` | Wrong optionality | `appliedPromoCode: string \| null`. The key is required and its value can be null. |
| `shippingAddress` | Flattened nesting | `shippingAddress: ShippingAddressResponseDto` with a separate interface. |
| `items[].quantity` | Type coercion | `quantity: number` with JSDoc identifying it as an integer. |
| `status` | Enum loss | `status: OrderStatus`, using the exported literal union for `PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, and `CANCELLED`. |

Convention findings: use `OrderResponseDto`, `OrderItemResponseDto`, and `ShippingAddressResponseDto` as interface names and export the `OrderStatus` type. Document the schema formats for `orderId`, `items[].productId`, `items[].variantId`, `createdAt`, `estimatedDelivery`, `totalAmount`, `items[].unitPrice`, and `items[].lineTotal` in JSDoc.

## Hardest call

Making `nextPage` optional would let a test accept a last-page response with the key missing, even though the API contract requires `nextPage: null` in that response.

## Second pass

All 15 schema properties appear exactly once across the three DTO interfaces, and `OrderStatus` preserves all six literals. The nested references, required fields, nullable fields, and wire formats match the schema.
