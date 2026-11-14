import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { CustomerSchema, OrderSchema, ArticleSchema, readContract } from './schemas.js';

const dataRoot = resolve(import.meta.dirname, '../data');

async function readRecords(filename, schema) {
  const text = await readFile(resolve(dataRoot, filename), 'utf8');
  return readContract(schema.array(), JSON.parse(text), filename);
}

export async function findCustomer(customerId) {
  const customers = await readRecords('customers.json', CustomerSchema);
  return customers.find((customer) => customer.id === customerId) ?? null;
}

export async function listCustomerOrders(customerId) {
  const orders = await readRecords('orders.json', OrderSchema);
  return orders.filter((order) => order.customerId === customerId);
}

export async function findCustomerOrder(customerId, orderId) {
  const orders = await listCustomerOrders(customerId);
  return orders.find((order) => order.id === orderId) ?? null;
}

export async function searchArticles(query) {
  const articles = await readRecords('help-articles.json', ArticleSchema);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return articles
    .map((article) => {
      const text = [article.title, ...article.keywords, article.body].join(' ').toLowerCase();
      return { article, score: terms.filter((term) => text.includes(term)).length };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.article.id.localeCompare(right.article.id))
    .slice(0, 3)
    .map(({ article }) => article);
}
