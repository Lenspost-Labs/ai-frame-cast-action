import { farcasterHubContext } from 'frames.js/middleware';
import { createFrames } from 'frames.js/next';
import { appURL } from '@/utils';

export const frames = createFrames({
  baseUrl: `${appURL()}/frames-hojayega/frames`,
  middleware: [farcasterHubContext()]
});
