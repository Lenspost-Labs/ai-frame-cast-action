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
  return true
});


export const POST = handler;
