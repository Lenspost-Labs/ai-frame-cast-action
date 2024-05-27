import { frames } from '@/app/cast-frames/frames/frames';
import { Button } from 'frames.js/next';
import { FAL_API_KEY, tunnelUrl } from '@/data';

const fnQueueFalAPI = async (message: string) => {
  const response = await fetch('https://queue.fal.run/fal-ai/fast-sdxl', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${FAL_API_KEY}`
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
