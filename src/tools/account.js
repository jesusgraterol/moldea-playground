import { tool } from '@openai/agents';
import { findCustomer, listCustomerOrders, findCustomerOrder } from '../catalog.js';
import { EmptyParametersSchema, OrderLookupSchema, SupportContextSchema, readContract } from '../schemas.js';

function accountContext(runContext) {
  return readContract(SupportContextSchema, runContext?.context, 'Account context');
}

export async function executeLookupCustomer(_input, runContext) {
  const { customerId } = accountContext(runContext);
  return { customer: await findCustomer(customerId) };
}

export async function executeListCustomerOrders(_input, runContext) {
  const { customerId } = accountContext(runContext);
  return { orders: await listCustomerOrders(customerId) };
}

export async function executeGetOrder(input, runContext) {
  const { customerId } = accountContext(runContext);
  const { orderId } = readContract(OrderLookupSchema, input, 'Order lookup');
  const order = await findCustomerOrder(customerId, orderId);
  return order
    ? { found: true, order }
    : { found: false, order: null, reason: 'Order unavailable in the current account.' };
}

export const lookupCustomerTool = tool({
  name: 'lookup_customer',
  description: 'Read the current customer name and membership from the account catalog.',
  parameters: EmptyParametersSchema,
  execute: executeLookupCustomer,
});

export const listCustomerOrdersTool = tool({
  name: 'list_customer_orders',
  description: 'List orders owned by the current customer to identify the relevant purchase.',
  parameters: EmptyParametersSchema,
  execute: executeListCustomerOrders,
});

export const getOrderTool = tool({
  name: 'get_order',
  description: 'Read status, delivery dates, tracking, and item details for an order in the current account.',
  parameters: OrderLookupSchema,
  execute: executeGetOrder,
});
