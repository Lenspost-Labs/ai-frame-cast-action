import { BACKEND_API } from '.';

const APP_URLS = Object.freeze({
  development: 'https://dev-poster-frame-action.vercel.app',
  production: 'https://poster-frame-action.vercel.app',
  local: 'https://572c-49-43-161-0.ngrok-free.app'
});

// Environments
export const ENV = process.env.ENVIRONMENT;

// Environment Variables
export const FAL_API_KEY = process.env.NEXT_PUBLIC_FAL_API_KEY;

// Application
export const APP_NAME = '';
export const APP_DESCRIPTION = `${APP_NAME}`;
export const APP_URL = APP_URLS[ENV as keyof typeof APP_URLS];
export const AUTHOR = 'Lenspost labs';
export const MIN_FEE = '0.0001';
// Lenspost labs
export const LENSPOST_APP_NAME = 'Poster';
export const LENSPOST_DESCRIPTION = `${LENSPOST_APP_NAME} is a fun onchain 'canva' that turns NFT holders into content creators with one click drag-drop-remix! Make NFTs do more for you as you churn out DOPE memes, gifs, social content & more! The most fun way to permissionlessly collaborate, monetize & even split revenues across chains. We're NFT INFRA at the back, RAVE party in the front - powering co-creation, revenue share & social distribution with BIG MEME ENERGY!`;
export const LENSPOST_APP_URL = 'https://app.poster.fun';
export const LENSPOST_HOME_URL = 'https://poster.fun';

// Lenspost labs social
export const LENSPOST_TWITTER_USERNAME = '@Lenspostxyz';
// URLs
export const BACKEND_ENDPOINT = BACKEND_API[ENV as keyof typeof BACKEND_API];
export const S3_IMAGE_URL = 'https://lenspost.s3.ap-south-1.amazonaws.com';
export const CDN_IMAGE_URL = 'https://lenspost.b-cdn.net';
