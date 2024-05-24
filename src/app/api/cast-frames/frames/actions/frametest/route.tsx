import { tunnelUrl } from '@/data';
import { appURL } from '../../../../../utils/common';
import { frames } from '../../frames';
import { ActionMetadata } from 'frames.js';

export const GET = async () => {
  const actionMetadata: ActionMetadata = {
    action: {
      type: 'post'
    },
    icon: 'number',
    name: 'Mint a new Frame',
    aboutUrl: `${appURL()}/frames-hojayega/`,
    description: 'Mint a new frame.'
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async () => {
  return Response.json({
    type: 'frame',
    frameUrl: `${tunnelUrl}/frames-hojayega/test/1`
  });
});
