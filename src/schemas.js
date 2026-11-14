import { z } from 'zod';

export const SupportRequestSchema = z.strictObject({
  customerId: z.string().regex(/^cus_[0-9]+$/),
  orderId: z.string().regex(/^HD-[0-9]+$/).nullable(),
  message: z.string().trim().min(1).max(8000),
  channel: z.enum(['email', 'chat']),
});

export const SupportContextSchema = z.strictObject({
  customerId: z.string().regex(/^cus_[0-9]+$/),
  orderId: z.string().regex(/^HD-[0-9]+$/).nullable(),
  requestId: z.uuid(),
  currentDate: z.iso.date(),
  channel: z.enum(['email', 'chat']),
});

export const SupportReplySchema = z.strictObject({
  topic: z.enum(['order', 'return', 'general']).meta({ description: 'The primary support topic.' }),
  reply: z.string().meta({ description: 'Customer-facing draft, ready for a representative to review.' }),
  nextAction: z.enum(['answer', 'request_information', 'human_review'])
    .meta({ description: 'The next step for the support representative.' }),
  orderId: z.string().nullable().meta({ description: 'Verified account order ID, or null when unverified or irrelevant.' }),
  citations: z.array(z.string()).meta({ description: 'Evidence IDs used: order IDs, article IDs, or supplied policy document paths.' }),
});

export const EmptyParametersSchema = z.strictObject({});
export const OrderLookupSchema = z.strictObject({
  orderId: z.string().meta({ description: 'Order ID to look up within the current customer account.' }),
});
export const ArticleSearchSchema = z.strictObject({
  query: z.string().meta({ description: 'Words describing the customer support question.' }),
});

export const CustomerSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  membership: z.enum(['standard', 'harbor-plus']),
});
export const OrderSchema = z.strictObject({
  id: z.string(),
  customerId: z.string(),
  placedAt: z.iso.date(),
  status: z.enum(['processing', 'shipped', 'delivered']),
  deliveredAt: z.iso.date().nullable(),
  estimatedDelivery: z.iso.date().nullable(),
  carrier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  items: z.array(z.strictObject({
    sku: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    finalSale: z.boolean(),
  })),
});
export const ArticleSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  keywords: z.array(z.string()),
  body: z.string(),
});

export function readContract(schema, value, label) {
  const result = schema.safeParse(value);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join('.') || 'value'))];
    throw new Error(label + ' is invalid (' + fields.join(', ') + ').');
  }
  return result.data;
}
