import { ActionMetadata } from 'frames.js';
import { tunnelUrl } from '@/data';
import { appURL } from '@/utils';

import { frames } from '../../frames';

export const GET = async () => {
  const actionMetadata: ActionMetadata = {
    aboutUrl: `${appURL()}/api/cast-frames/`,
    action: {
      type: 'post'
    },
    description: 'Mint a new frame.',
    name: 'Mint a new Frame',
    icon: 'number'
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async () => {
  return Response.json({
    frameUrl: `${tunnelUrl}/api/cast-frames/frame/1`,
    type: 'frame'
  });
});
