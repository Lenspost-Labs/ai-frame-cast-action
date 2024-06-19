import { frames } from '@/app/cast-frames/frames/frames';
import { FAL_API_KEY, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

const fnQueueFalAPI = async (message: string) => {
  const response = await fetch('https://fal.run/fal-ai/fast-sdxl', {
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
  const image_url = res?.images[0].url;
  if (count === 2) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen`}
          key="generateButton2"
          action="post"
        >
          Generate 2/5
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/2`}
          key="mintButton2"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],

      state: {
        generateCount: count,
        imageUrl: image_url
      },
      imageOptions: {
        aspectRatio: '1:1'
      },
      textInput: 'New Prompt',
      image: image_url
    };
  } else if (count === 3) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen`}
          key="generateButton3"
          action="post"
        >
          Generate 3/5
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/2`}
          key="mintButton3"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],
      state: {
        generateCount: count,
        imageUrl: image_url
      },
      imageOptions: {
        aspectRatio: '1:1'
      },
      textInput: 'New Prompt',
      image: image_url
    };
  } else if (count === 4) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen`}
          key="generateButton4"
          action="post"
        >
          Generate 4/5
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/2`}
          key="mintButton4"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],

      state: {
        generateCount: count,
        imageUrl: image_url
      },
      imageOptions: {
        aspectRatio: '1:1'
      },
      textInput: 'New Prompt',
      image: image_url
    };
  } else if (count === 5) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen`}
          key="generateButton5"
          action="post"
        >
          Generate 5/5
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/2`}
          key="mintButton5"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],
      state: {
        generateCount: count,
        imageUrl: image_url
      },
      imageOptions: {
        aspectRatio: '1:1'
      },
      textInput: 'New Prompt',
      image: image_url
    };
  } else {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/cast-frames/frame/2`}
          key="mintButton5"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],
      state: {
        generateCount: count,
        imageUrl: image_url
      },
      imageOptions: {
        aspectRatio: '1:1'
      },
      image: image_url
    };
  }
});

export const POST = handler;
