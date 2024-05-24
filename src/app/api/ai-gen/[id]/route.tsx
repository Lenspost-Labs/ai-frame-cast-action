import { tunnelUrl } from '~~/app/frames-hojayega/test/Frames';

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
  const ImageID = ctx.state?.ImageID as string;
  const res = await fnGetStatusAPI(ImageID);
  const status = res?.status;
  if (status === 'IN_QUEUE' || status === 'IN_PROGRESS') {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/api/ai-gen/${ImageID}`}
          action="post"
          key="retry"
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
    const state = JSON.parse(ctx.message.state);
    const count = state.generateCount;
    const image_url = response.images[0].url;
    if (count === 2) {
      return {
        image: image_url,
        buttons: [
          <Button action="post" target={`${tunnelUrl}/api/ai-gen`}>
            Generate 2/5
          </Button>,
          <Button action="post" target={`${tunnelUrl}/frames-hojayega/test/2`}>
            Let's Mint
          </Button>
        ],
        textInput: 'New Prompt',
        state: {
          imageUrl: image_url,
          generateCount: count
        }
      };
    } else if (count === 3) {
      return {
        image: image_url,
        buttons: [
          <Button action="post" target={`${tunnelUrl}/api/ai-gen`}>
            Generate 3/5
          </Button>,
          <Button action="post" target={`${tunnelUrl}/frames-hojayega/test/2`}>
            Let's Mint
          </Button>
        ],
        textInput: 'New Prompt',
        state: {
          imageUrl: image_url,
          generateCount: count
        }
      };
    } else if (count === 4) {
      return {
        image: image_url,
        buttons: [
          <Button action="post" target={`${tunnelUrl}/api/ai-gen`}>
            Generate 4/5
          </Button>,
          <Button action="post" target={`${tunnelUrl}/frames-hojayega/test/2`}>
            Let's Mint
          </Button>
        ],
        state: {
          generateCount: count,
          imageUrl: image_url
        },
        textInput: 'New Prompt'
      };
    } else if (count === 5) {
      return {
        image: image_url,
        buttons: [
          <Button action="post" target={`${tunnelUrl}/api/ai-gen`}>
            Generate 5/5
          </Button>,
          <Button action="post" target={`${tunnelUrl}/frames-hojayega/test/2`}>
            Let's Mint
          </Button>
        ],
        textInput: 'New Prompt',
        state: {
          imageUrl: image_url,
          generateCount: count
        }
      };
    } else return { image: <span>Generates Used Up!</span> };
  }
});

export const POST = handler;
