/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { tunnelUrl } from '@/data';

import { frames } from '../../frames/frames';
// @ts-ignore
const handler = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/cast-frames/frame/', '');
  return await getFrameById(parseInt(frameId), ctx);
});

const getFrameById = async (frameId: number, ctx: any) => {
  const newFrameId = frameId + 1;
  const state = ctx.state || {};
  const fid = ctx.message.requesterFid;
  if (frameId === 1) {
    const address = await fetch(
      `https://dev.poster.fun/mint/by-fid?fid=${fid}`,
      {
        method: 'GET'
      }
    );
    const { publicAddress } = await address.json();
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
      state: { custodialAddress: publicAddress, generateCount: 1 },
      image: <span>Generate your AI image</span>,
      textInput: 'Enter your prompt'
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
    const allowedMints = ctx.message.textInput as number;
    return {
      buttons: [
        <Button
          post_url={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          target={`${tunnelUrl}/api/tx-send`}
          key="continueButton4"
          action="tx"
        >
          Continue
        </Button>
      ],
      state: {
        ...state,
        allowedMints: allowedMints
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
    const state = ctx.state || {};
    const createFrameBody = {
      contractAddress: state.custodialAddress,
      redirectLink: state.redirectLink,
      allowedMints: state.allowedMints,
      evm_address: state.evm_address,
      fid: ctx.message.requesterFid,
      gatedCollections: 'farcaster',
      gatedChannels: 'farcaster',
      isRecast: state.recast,
      isFollow: state.follow,
      isLike: state.like,
      isTopUp: true,
      canvasId: 1,
      chainId: 1
    };
    return {
      buttons: [
        <Button
          target={`${tunnelUrl}/cast-frames/frame/${newFrameId}`}
          key="shareFrameButton"
          action="post_redirect"
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
