import { tool } from '@openai/agents';
import { searchArticles } from '../catalog.js';
import { ArticleSearchSchema, readContract } from '../schemas.js';

export async function executeSearchHelpArticles(input) {
  const { query } = readContract(ArticleSearchSchema, input, 'Article search');
  return { articles: await searchArticles(query) };
}

export const searchHelpArticlesTool = tool({
  name: 'search_help_articles',
  description: 'Search help articles for delivery, return, and account support procedures.',
  parameters: ArticleSearchSchema,
  execute: executeSearchHelpArticles,
});
