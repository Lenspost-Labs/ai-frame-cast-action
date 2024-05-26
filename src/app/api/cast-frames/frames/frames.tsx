import { appURL } from '../../../utils/common';
import { createFrames } from 'frames.js/next';
import { farcasterHubContext } from 'frames.js/middleware';

export const frames = createFrames({
  baseUrl: `${appURL()}/frames-hojayega/frames`,
  middleware: [farcasterHubContext()]
});
