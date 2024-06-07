const mode = process.env.NODE_ENV || 'development';

export const framesConfig = {
  framesURL:
    mode === 'development'
      ? 'https://dev-frames.vercel.app/frame'
      : 'https://frames.poster.fun/frame',
  chainId: mode === 'development' ? 84532 : 8453
};
