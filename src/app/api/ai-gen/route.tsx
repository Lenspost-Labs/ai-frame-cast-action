import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../cast-frames/frames/frames';

const fnQueueFalAPI = async (message: string) => {
  const falApiKey =
    '58fa9a8e-598c-41d4-830f-80d55fe958c9:c279eed1eae5206f29def23d9528e9e6';
  const response = await fetch('https://queue.fal.run/fal-ai/fast-sdxl', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${falApiKey}`
    },
    body: JSON.stringify({
      prompt: message
    }),
    method: 'POST'
  });
  return response.json();
};

const handler = frames(async (ctx) => {
  const state = JSON.parse(ctx?.message?.state ? ctx?.message.state : '{}');
  const count = state.generateCount + 1;
  const prompt = ctx.message?.inputText as string;
  const res = await fnQueueFalAPI(prompt);
  const imageId = res?.request_id;
  return {
    buttons: [
      <Button
        target={`${tunnelUrl}/api/ai-gen/${imageId}`}
        action="post"
        key="status"
      >
        Check Status
      </Button>
    ],
    state: {
      generateCount: count,
      imageId: imageId
    },
    image: <span>Please Wait for AI Image Generation....</span>
  };
});

export const POST = handler;
