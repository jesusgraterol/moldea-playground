import { parseArgs } from 'node:util';
import { runSupportWorkflow } from './workflow.js';

async function main() {
  const { values } = parseArgs({
    options: {
      customer: { type: 'string' },
      order: { type: 'string' },
      message: { type: 'string' },
      channel: { type: 'string', default: 'email' },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });
  if (values.help) {
    console.log('Usage: npm start -- --customer <id> [--order <id>] --message <text> [--channel email|chat]');
    return;
  }
  const result = await runSupportWorkflow({
    customerId: values.customer,
    orderId: values.order ?? null,
    message: values.message,
    channel: values.channel,
  });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Unable to prepare the support reply.');
  process.exitCode = 1;
});
