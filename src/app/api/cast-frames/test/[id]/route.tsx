/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/jsx-key */
import { tunnelUrl } from '@/data';
import { frames } from '../../frames/frames';
import { Button } from 'frames.js/next';

const handler = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/frames-hojayega/test/', '');
  return getFrameById(parseInt(frameId), ctx);
});
const gatingOptions = (ctx: any, state: any) => {
  if (!ctx.message?.requesterFollowsCaster) {
    return {
      image: <span>Please Follow, Like and Recast to Mint</span>
    };
  }
  if (!ctx.message.likedCast) {
    return {
      image: <span>Please Like, Recast to Mint</span>
    };
  }
  if (!ctx.message.recastedCast) {
    return {
      image: <span>Please Recast to Mint</span>
    };
  }
  // handle state here also
  return {
    image: <span>Add any external redirect link to the frame</span>,
    buttons: [
      <Button
        action="post"
        target={`${tunnelUrl}/frames-hojayega/test/generate`}
      >
        Continue
      </Button>,
      <Button action="post" target={`${tunnelUrl}/frames-hojayega/test/` + 3}>
        Skip
      </Button>
    ],
    textInput: 'Add URL'
  };
};

const getFrameById = (frameId: number, ctx: any) => {
  const newFrameId = frameId + 1;
  const state = ctx.state || {};
  if (frameId === 1) {
    return {
      image: <span>Generate your AI image</span>,
      buttons: [
        <Button action="post" target={`${tunnelUrl}/api/ai-gen`}>
          Generate (1/5)
        </Button>,
        <Button
          action="post"
          target={`${tunnelUrl}/frames-hojayega/test/` + newFrameId}
        >
          Let's Mint
        </Button>
      ],
      state: { generateCount: 1 }
    };
  } else if (frameId === 2) {
    return gatingOptions(ctx, state);
  } else if (frameId === 3) {
    return {
      image: <span>No of mints</span>,
      buttons: [
        <Button
          action="post"
          target={`${tunnelUrl}/frames-hojayega/test/` + newFrameId}
        >
          Continue
        </Button>
      ],
      textInput: 'No of Mints',
      state: {
        ...state
      }
    };
  } else if (frameId === 4) {
    const noOfMints = ctx.message.inputText;
    return {
      image: <span>Top up gas 0.001 ETH</span>,
      buttons: [
        <Button
          action="post"
          target={`${tunnelUrl}/frames-hojayega/test/` + newFrameId}
        >
          Continue
        </Button>
      ],
      state: {
        ...state,
        NoOfMints: noOfMints
      }
    };
  } else if (frameId === 5) {
    const ImageURL = state.imageUrl;
    return {
      image: ImageURL,
      buttons: [
        <Button
          action="post"
          target={`${tunnelUrl}/frames-hojayega/test/` + newFrameId}
        >
          Create Frame
        </Button>
      ],
      textInput: 'Name of the Mint'
    };
  } else if (frameId === 6) {
    // hit api here to create frame from poster
    // add name also
    return {
      image: <span>Share your created frame</span>,
      buttons: [
        <Button
          action="post"
          target={`${tunnelUrl}/frames-hojayega/test/` + newFrameId}
        >
          Share your frame link
        </Button>
      ]
    };
  }
};
export const GET = handler;
export const POST = handler;
