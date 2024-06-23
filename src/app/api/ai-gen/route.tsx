import { frames } from '@/app/cast-frames/frames/frames';
import { FAL_API_KEY, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

const fnQueueFalAPI = async (message: string) => {
  const response = await fetch('https://queue.fal.run/fal-ai/fast-sdxl', {
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: message
    }),
    method: 'POST'
  });
  return response.json();
};

// @ts-ignore
const handler = frames(async (ctx) => {
  const state = JSON.parse(ctx?.message?.state ? ctx?.message.state : '{}');
  const count = state.generateCount + 1;
  const prompt = ctx.message?.inputText as string;
  const res = await fnQueueFalAPI(prompt);
  const ImageID = res?.request_id;
  return {
    buttons: [
      <Button
        target={`${APP_URL}/api/ai-gen/${ImageID}`}
        key="checkStatusButton"
        action="post"
      >
        Check Status
      </Button>
    ],
    image:
      'https://cdn.pixabay.com/animation/2023/01/09/18/04/18-04-38-312_512.gif',
    state: {
      generateCount: count,
      ImageID: ImageID
    }
  };
});

export const POST = handler;
