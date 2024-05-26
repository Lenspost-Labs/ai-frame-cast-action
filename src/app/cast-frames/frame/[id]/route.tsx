/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../../frames/frames';
// @ts-ignore
const handler = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/cast-frames/frame/', '');
  return getFrameById(parseInt(frameId), ctx);
});

const getFrameById = (frameId: number, ctx: any) => {
  const newFrameId = frameId + 1;
  const state = ctx.state || {};
  if (frameId === 1) {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/api/ai-gen`}
          key="generateButton"
          action="post"
        >
          Generate (1/5)
        </Button>,
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="mintButton"
          action="post"
        >
          Let&apos;s Mint
        </Button>
      ],
      image: <span>Generate your AI image</span>,
      textInput: 'Enter your prompt',
      state: { generateCount: 1 }
    };
  } else if (frameId === 2) {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          No
        </Button>
      ],
      state: {
        ...state
      },
      image: <span>Add Follow</span>
    };
  } else if (frameId === 3) {
    if (ctx.message.buttonIndex === 1) {
      state.follow = true;
    } else if (ctx.message.buttonIndex === 2) {
      state.follow = false;
    }
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          No
        </Button>
      ],
      state: {
        ...state
      },
      image: <span>Add Like</span>
    };
  } else if (frameId === 4) {
    if (ctx.message.buttonIndex === 1) {
      state.like = true;
    } else if (ctx.message.buttonIndex === 2) {
      state.like = false;
    }
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          No
        </Button>
      ],
      state: {
        ...state
      },
      image: <span>Add Recast</span>
    };
  } else if (frameId === 5) {
    if (ctx.message.buttonIndex === 1) {
      state.recast = true;
    } else if (ctx.message.buttonIndex === 2) {
      state.recast = false;
    }
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Submit
        </Button>,
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          Skip
        </Button>
      ],
      textInput: 'Enter External URL (Optional)',
      image: <span>Add External Link</span>,
      state: {
        ...state
      }
    };
  } else if (frameId === 6) {
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
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
  } else if (frameId === 7) {
    const noOfMints = ctx.message;
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
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
  } else if (frameId === 8) {
    const imageUrl = state.imageUrl;
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="createFrameButton"
          action="post"
        >
          Create Frame
        </Button>
      ],
      textInput: 'Name of the Mint',
      image: imageUrl
    };
  } else if (frameId === 9) {
    // hit  here to create frame from poster
    // add name also
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
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
