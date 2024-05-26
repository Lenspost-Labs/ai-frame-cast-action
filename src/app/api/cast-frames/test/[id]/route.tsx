/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../../frames/frames';
// @ts-ignore
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
    buttons: [
      <Button
        target={`${tunnelUrl}/frames-hojayega/test/generate`}
        action="post"
      >
        Continue
      </Button>,
      <Button target={`${tunnelUrl}/frames-hojayega/test/` + 3} action="post">
        Skip
      </Button>
    ],
    image: <span>Add any external redirect link to the frame</span>,
    textInput: 'Add URL'
  };
};

const getFrameById = (frameId: number, ctx: any) => {
  const newFrameId = frameId + 1;
  const state = ctx.state || {};

  if (frameId === 1) {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/api/ai-gen`}
          key="generateButton1"
          action="post"
        >
          Generate (1/5)
        </Button>,
        <Button
          target={`${tunnelUrl}/frames-hojayega/test/${newFrameId}`}
          key="mintButton1"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],
      image: <span>Generate your AI image</span>,
      state: { generateCount: 1 }
    };
  } else if (frameId === 2) {
    return gatingOptions(ctx, state);
  } else if (frameId === 3) {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/frames-hojayega/test/${newFrameId}`}
          key="continueButton3"
          action="post"
        >
          Continue
        </Button>
      ],
      state: {
        ...state
      },
      image: <span>No of mints</span>,
      textInput: 'No of Mints'
    };
  } else if (frameId === 4) {
    const noOfMints = ctx.message.inputText;
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/frames-hojayega/test/${newFrameId}`}
          key="continueButton4"
          action="post"
        >
          Continue
        </Button>
      ],
      state: {
        ...state,
        NoOfMints: noOfMints
      },
      image: <span>Top up gas 0.001 ETH</span>
    };
  } else if (frameId === 5) {
    const imageUrl = state.imageUrl;
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/frames-hojayega/test/${newFrameId}`}
          key="createFrameButton"
          action="post"
        >
          Create Frame
        </Button>
      ],
      textInput: 'Name of the Mint',
      image: imageUrl
    };
  } else if (frameId === 6) {
    // hit api here to create frame from poster
    // add name also
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/frames-hojayega/test/${newFrameId}`}
          key="shareFrameButton"
          action="post"
        >
          Share your frame link
        </Button>
      ],
      image: <span>Share your created frame</span>
    };
  }
};
export const GET = handler;
export const POST = handler;
