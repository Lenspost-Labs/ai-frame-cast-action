import { frames } from '../../../app/frames-hojayega/frames/frames';
import { Button } from 'frames.js/next';
import { tunnelUrl } from '~~/app/frames-hojayega/test/Frames';

const fnQueueFalAPI = async (message: string) => {
  const falApiKey =
    '58fa9a8e-598c-41d4-830f-80d55fe958c9:c279eed1eae5206f29def23d9528e9e6';
  const response = await fetch('https://queue.fal.run/fal-ai/fast-sdxl', {
    method: 'POST',
    headers: {
      Authorization: `Key ${falApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: message
    })
  });
  return response.json();
};

const handler = frames(async (ctx) => {
  const state = JSON.parse(ctx.message.state);
  const count = state.generateCount + 1;
  const prompt = ctx.message?.inputText as string;
  const res = await fnQueueFalAPI(prompt);
  const ImageID = res?.request_id;
  return {
    image: <span>Please Wait for AI Image Generation....</span>,
    buttons: [
      <Button action="post" target={`${tunnelUrl}/api/ai-gen/${ImageID}`}>
        Check Status
      </Button>
    ],
    state: {
      ImageID: ImageID,
      generateCount: count
    }
  };
});

export const POST = handler;
