import { frames } from '@/app/cast-frames/frames/frames';
import { fnGetStatusAPI, falGetImageAPI } from '@/utils';
import { Button } from 'frames.js/next';
import { APP_URL } from '@/data';

// @ts-ignore
const handler = frames(async (ctx) => {
  const imageId: string = (ctx?.state as unknown as { imageId: string })
    ?.imageId;
  const state: any = JSON.parse(ctx?.message?.state as string);
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
          Check Status
        </Button>
      ],
      image: <span>AI Image Still Generating</span>,
      state: {
        ...state
      }
    };
  } else {
    const res_url = res?.response_url;
    const response = await falGetImageAPI(res_url);
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
