import { frames } from '@/app/cast-frames/frames/frames';
import { FAL_API_KEY, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

const fnGetStatusAPI = async (request_id: string) => {
  const response = await fetch(
    `https://queue.fal.run/fal-ai/fast-sdxl/requests/${request_id}/status`,
    {
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  );
  return response.json();
};

const falGetImageAPI = async (response_url: string) => {
  const response = await fetch(response_url, {
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });
  return response.json();
};

// @ts-ignore
const handler = frames(async (ctx) => {
  // @ts-ignore
  const imageId: string = ctx?.state.imageId || '';
  const res = await fnGetStatusAPI(imageId);
  const status = res?.status;

  if (status === 'IN_QUEUE' || status === 'IN_PROGRESS') {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen/${imageId}`}
          key="retryButton"
          action="post"
        >
          Retry
        </Button>
      ],
      image: <span>Please Wait for AI Image Generation....</span>,
      textInput: 'New Prompt'
    };
  } else {
    const res_url = res?.response_url;
    const response = await falGetImageAPI(res_url);
    // @ts-ignore
    const state = JSON.parse(ctx.message.state);
    const count = state.generateCount;
    const image_url = response.images[0].url;

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
        textInput: 'New Prompt',
        image: image_url
      };
    } else {
      return {
        image: <span>Generates Used Up!</span>
      };
    }
  }
});

export const POST = handler;
