import { headers } from 'next/headers';
import { FAL_API_KEY } from '@/data';

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';

  try {
    return new URL(pathname, `${protocol}://${host}`);
  } catch (error) {
    return new URL('http://localhost:3000');
  }
}

export function appURL() {
  if (process.env.APP_URL) {
    return process.env.APP_URL;
  } else {
    const url = process.env.APP_URL || vercelURL() || 'http://localhost:3000';
    // eslint-disable-next-line no-console
    console.warn(
      `Warning: APP_URL environment variable is not set. Falling back to ${url}.`
    );
    return url;
  }
}

export function vercelURL() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
}

export const fnGetStatusAPI = async (request_id: string) => {
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

export const falGetImageAPI = async (response_url: string) => {
  const response = await fetch(response_url, {
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });
  return response.json();
};
