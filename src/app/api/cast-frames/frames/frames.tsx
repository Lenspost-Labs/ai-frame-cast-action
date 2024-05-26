import { farcasterHubContext } from 'frames.js/middleware';
import { createFrames } from 'frames.js/next';
import { appURL } from '@/utils';

export const frames = createFrames({
  baseUrl: `${appURL()}/api/cast-frames/frames`,
  middleware: [farcasterHubContext()]
});
