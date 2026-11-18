import { defineDynamic, defineInstructions } from 'eve/instructions';
import { releaseSession } from '../lib/session.ts';

export default defineDynamic(() => defineInstructions({
  role: 'system',
  content: 'Current release session context: ' + JSON.stringify(releaseSession.get()),
}));
