import { frames } from '@/app/cast-frames/frames/frames';
import { FAL_API_KEY, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

const fnGetStatusAPI = async (request_id: string) => {
  try {
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
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error; // Rethrow the error for further handling
  }
};

const falGetImageAPI = async (response_url: string) => {
  try {
    const response = await fetch(response_url, {
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; // Rethrow the error for further handling
  }
};

// @ts-ignore
const handler = frames(async (ctx) => {
  const state = JSON.parse(ctx.message?.state || '{}');
  const ImageID = state.ImageID as string;
  const res = await fnGetStatusAPI(ImageID);
  const status = res?.status;
  if (status === 'IN_QUEUE' || status === 'IN_PROGRESS') {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen/${ImageID}`}
          key="RetryButton"
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
    const state = JSON.parse(ctx.message?.state || '{}');
    const count = state.generateCount;
    const image_url = response.images[0].url;
    if (count === 1) {
      return {
        buttons: [
          <Button
            target={`${APP_URL}/api/ai-gen`}
            key="Generate1Button"
            action="post"
          >
            Generate 1/5
          </Button>,
          <Button
            target={`${APP_URL}/cast-frames/frame/2`}
            key="MintButton"
            action="post"
          >
            Let&apos;s Mint
          </Button>
        ],
        state: {
          generateCount: count + 1,
          imageUrl: image_url
        },
        imageOptions: {
          aspectRatio: '1:1'
        },
        textInput: 'New Prompt',
        image: image_url
      };
    } else if (count === 2) {
      return {
        buttons: [
          <Button
            target={`${APP_URL}/api/ai-gen`}
            key="GenerateButton"
            action="post"
          >
            Generate 2/5
          </Button>,
          <Button
            target={`${APP_URL}/cast-frames/frame/2`}
            key="MintButton"
            action="post"
          >
            Let&apos;s Mint
          </Button>
        ],
        state: {
          generateCount: count + 1,
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
            key="GenerateButton"
            action="post"
          >
            Generate 3/5
          </Button>,
          <Button
            target={`${APP_URL}/cast-frames/frame/2`}
            key="MintButton"
            action="post"
          >
            Let&apos;s Mint
          </Button>
        ],
        state: {
          generateCount: count + 1,
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
            key="GenerateButton"
            action="post"
          >
            Generate 4/5
          </Button>,
          <Button
            target={`${APP_URL}/cast-frames/frame/2`}
            key="MintButton"
            action="post"
          >
            Let&apos;s Mint
          </Button>
        ],
        state: {
          generateCount: count + 1,
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
            key="GenerateButton"
            action="post"
          >
            Generate 5/5
          </Button>,
          <Button
            target={`${APP_URL}/cast-frames/frame/2`}
            key="MintButton"
            action="post"
          >
            Let&apos;s Mint
          </Button>
        ],
        state: {
          generateCount: count + 1,
          imageUrl: image_url
        },
        imageOptions: {
          aspectRatio: '1:1'
        },
        textInput: 'New Prompt',
        image: image_url
      };
    } else return { image: <span>Generates Used Up!</span> };
  }
});

export const POST = handler;
