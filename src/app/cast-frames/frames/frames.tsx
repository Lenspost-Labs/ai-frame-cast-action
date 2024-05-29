import { farcasterHubContext } from 'frames.js/middleware';
import { createFrames } from 'frames.js/next';
import { APP_URL } from '@/data';

export const frames = createFrames({
  baseUrl: `${APP_URL}`,
  middleware: [
    farcasterHubContext()
  ],
  initialState: {
    evmAddress: ''
  }
});
