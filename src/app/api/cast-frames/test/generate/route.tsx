/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../../frames/frames';

const handler = frames(async (ctx) => {
  const message = ctx.message?.inputText;
  const encodedMessage = encodeURIComponent(message as string);
  const imageUrl = `${tunnelUrl}/api/images/?date=${Date.now()}&message=${encodedMessage}`;
  const updatedState = {
    ...(ctx.message?.state as any),
    imageUrl
  };
  return {
    buttons: [
      <Button
        target={`${tunnelUrl}/api/aiFrame/?message=${encodedMessage}`}
        action="post"
      >
        Check
      </Button>
    ],
    image: <div>Check your image</div>,
    state: updatedState
  };
});

export const POST = handler;
