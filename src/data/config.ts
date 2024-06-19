const mode = process.env.ENVIRONMENT || 'local';

export const framesConfig = {
  framesURL:
    mode === 'production'
      ? 'https://frames.poster.fun/frame'
      : 'https://dev-frames.vercel.app/frame',
  chainId: mode === 'production' ? 8453 : 84532
};
