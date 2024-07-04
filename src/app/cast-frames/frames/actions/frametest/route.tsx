import { ActionMetadata } from 'frames.js';
import { APP_URL } from '@/data';

import { frames } from '../../frames';

export const GET = async () => {
  const actionMetadata: ActionMetadata = {
    description:
      'Generate ai posters & set mint as frames RIGHT FROM YOUR FEED!',
    aboutUrl: `${APP_URL}/cast-frames/`,
    action: {
      type: 'post'
    },
    name: 'Poster Action',
    icon: 'pencil'
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async () => {
  return Response.json({
    frameUrl: `${APP_URL}/cast-frames/frame/1`,
    type: 'frame'
  });
});
