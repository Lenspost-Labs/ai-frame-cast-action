/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { APP_URL } from '@/data';
import { frames } from '../../frames/frames';

const fidToConnectedAddressMap = new Map<number, string>();
export const storeFidToConnectedAddressMap = (fid: number, connectedAddress: string) => {
  fidToConnectedAddressMap.set(fid, connectedAddress);
}

export const getConnectedAddressByFid = (fid: number) => {
  return fidToConnectedAddressMap.get(fid);
}


export const POST = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/cast-frames/frame/', '');
  return await getFrameById(parseInt(frameId), ctx);
});

const getFrameById = async (frameId: number, ctx: any) => {
  console.log(ctx, frameId);
  const newFrameId = frameId + 1;
  const state = ctx.state || {};
  const fid = ctx.message.requesterFid;
  if (frameId === 1) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/api/ai-gen`}
          key="generateButton"
          action="post"
        >
          Generate (1/5)
        </Button>,
      ],
      state: { generateCount: 1, ...state },
      image: <span>Generate your AI image</span>,
      textInput: 'Enter your prompt'
    };
  } else if (frameId === 2) {
    return {
      buttons: [
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
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
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
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
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Yes
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
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
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="yesButton"
          action="post"
        >
          Submit
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
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
    const address = await fetch(
      `https://dev.poster.fun/mint/by-fid?fid=${fid}`,
      {
        method: 'GET'
      }
    );
    const { publicAddress } = await address.json();
    state.custodialAddress = publicAddress;
    if (ctx.message.textInput !== '') {
      state.redirectLink = ctx.message.textInput;
    }
    return {
      buttons: [
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
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
    state.allowedMints = allowedMints;
    state.evmAddress = '';
    console.log(state, 'inside frame 7')
    return {
      buttons: [
        <Button
          post_url={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          target={`${APP_URL}/api/tx-send`}
          key="continueButton4"
          action="tx"

        >
          Continue
        </Button>
      ],
      state: {
        ...state
      },
      image: <span>Top up gas 0.001 ETH</span>
    };
  } else if (frameId === 8) {
    const imageUrl = state.imageUrl;
    const evmAddress = getConnectedAddressByFid(fid);
    state.evmAddress = evmAddress;
    return {
      buttons: [
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="createFrameButton"
          action="post"
        >
          Create Frame
        </Button>
      ],
      state: {
        ...state
      },
      textInput: 'Name of the Mint',
      image: imageUrl
    };
  } else if (frameId === 9) {
    // hit  here to create frame from poster
    // add name also
    const state = ctx.state || {};
    const createFrameBody = {
      redirectLink: state?.redirectLink || '',
      allowedMints: state.allowedMints || 1,
      evm_address: state.evmAddress,
      fid: ctx.message.requesterFid,
      gatedCollections: 'farcaster',
      gatedChannels: 'farcaster',
      isRecast: state.recast,
      isFollow: state.follow,
      isLike: state.like,
      isTopUp: true,
      chainId: 84532,
      imageUri: state.imageUrl || ''
    };
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(createFrameBody);
    const response = await fetch('https://dev.poster.fun/util/create-frame', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createFrameBody),
      method: 'POST'
    });
    const data = await response.json();
    console.log(data);
    const linkToShare = `https://warpcast.com/~/compose?text=Created%20using%20Poster!&embeds[]=http://frames.poster.fun/frame/${data.frameId}`;
    return {
      buttons: [
        <Button target={`${linkToShare}`} key="shareFrameButton" action="link">
          Share your frame link
        </Button>
      ],
      image: <span>Share your created frame</span>
    };
  }
};
export const GET = POST;
