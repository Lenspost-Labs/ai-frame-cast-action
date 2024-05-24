/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/jsx-key */
import { frames } from '../../frames/frames';
import { tunnelUrl } from '../Frames';
import { Button } from 'frames.js/next';

const handler = frames(async (ctx) => {
  const message = ctx.message?.inputText;
  const encodedMessage = encodeURIComponent(message as string);
  const imageUrl = `${tunnelUrl}/api/images/?date=${Date.now()}&message=${encodedMessage}`;
  const updatedState = {
    ...(ctx.message?.state as any),
    imageUrl
  };
  return {
    image: <div>Check your image</div>,
    buttons: [
      <Button
        action="post"
        target={`${tunnelUrl}/api/aiFrame/?message=${encodedMessage}`}
      >
        Check
      </Button>
    ],
    state: updatedState
  };
});

export const POST = handler;
