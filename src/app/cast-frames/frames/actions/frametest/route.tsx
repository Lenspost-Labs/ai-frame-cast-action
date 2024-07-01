import { ActionMetadata } from 'frames.js';
import { APP_URL } from '@/data';

import { frames } from '../../frames';

export const GET = async () => {
  const actionMetadata: ActionMetadata = {
    aboutUrl: `${APP_URL}/cast-frames/`,
    action: {
      type: 'post'
    },
    description: 'Mint a new frame.',
    name: 'Poster Action',
    icon: 'image'
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async () => {
  return Response.json({
    frameUrl: `${APP_URL}/cast-frames/frame/1`,
    type: 'frame'
  });
});
