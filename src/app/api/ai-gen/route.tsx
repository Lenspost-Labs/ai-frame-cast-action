import { frames } from '@/app/cast-frames/frames/frames';
import { FAL_API_KEY, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

const fnQueueFalAPI = async (message: string) => {
  try {
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

    if (!response.ok) {
      throw new Error(`Failed to queue Fal API, status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error queuing Fal API:', error);
    throw error;
  }
};

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

    if (!response.ok) {
      throw new Error(`Failed to get status, status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting status:', error);
    throw error;
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

    if (!response.ok) {
      throw new Error(`Failed to get image, status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting image:', error);
    throw error;
  }
};

const MAX_WAIT_TIME = 2800; // milliseconds

// @ts-ignore
const handler = frames(async (ctx) => {
  const startTime = Date.now();
  const state = JSON.parse(ctx?.message?.state ? ctx?.message.state : '{}');
  const count = state.generateCount + 1;
  const prompt = ctx?.message?.inputText as string;
  const res = await fnQueueFalAPI(prompt);
  const ImageID = res?.request_id;
  while (Date.now() - startTime < MAX_WAIT_TIME) {
    const statusRes = await fnGetStatusAPI(ImageID);
    const status = statusRes?.status;
    if (status !== 'IN_QUEUE' && status !== 'IN_PROGRESS') {
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
  }
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
    state: {
      generateCount: count + 1,
      ImageID: ImageID
    },
    imageOptions: {
      aspectRatio: '1:1'
    },
    image: '/assets/countdown.gif'
  };
});

export const POST = handler;
