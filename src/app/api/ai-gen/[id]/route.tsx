import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../../cast-frames/frames/frames';

const fnGetStatusAPI = async (request_id: string) => {
  const falApiKey =
    '58fa9a8e-598c-41d4-830f-80d55fe958c9:c279eed1eae5206f29def23d9528e9e6';
  const response = await fetch(
    `https://queue.fal.run/fal-ai/fast-sdxl/requests/${request_id}/status`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${falApiKey}`
      },
      method: 'GET'
    }
  );
  return response.json();
};

const falGetImageAPI = async (response_url: string) => {
  const falApiKey =
    '58fa9a8e-598c-41d4-830f-80d55fe958c9:c279eed1eae5206f29def23d9528e9e6';
  const response = await fetch(response_url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${falApiKey}`
    },
    method: 'GET'
  });
  return response.json();
};

const handler = frames(async (ctx) => {
  // @ts-ignore
  const imageId: string = JSON.parse(ctx?.state).imageId || '';
  const res = await fnGetStatusAPI(imageId);
  const status = res?.status;

  if (status === 'IN_QUEUE' || status === 'IN_PROGRESS') {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/api/ai-gen/${imageId}`}
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
            target={`${tunnelUrl}/api/ai-gen`}
            key="generateButton2"
            action="post"
          >
            Generate 2/5
          </Button>,
          <Button
            target={`${tunnelUrl}/frames-hojayega/test/2`}
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
            target={`${tunnelUrl}/api/ai-gen`}
            key="generateButton3"
            action="post"
          >
            Generate 3/5
          </Button>,
          <Button
            target={`${tunnelUrl}/frames-hojayega/test/2`}
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
            target={`${tunnelUrl}/api/ai-gen`}
            key="generateButton4"
            action="post"
          >
            Generate 4/5
          </Button>,
          <Button
            target={`${tunnelUrl}/frames-hojayega/test/2`}
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
            target={`${tunnelUrl}/api/ai-gen`}
            key="generateButton5"
            action="post"
          >
            Generate 5/5
          </Button>,
          <Button
            target={`${tunnelUrl}/frames-hojayega/test/2`}
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
