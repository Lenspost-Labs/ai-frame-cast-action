import {
  getPublicAddressAndBalance,
  getConnectedAddressByFid,
  createFrameApi
} from '@/services';
import { framesConfig } from '@/data/config';
import { Button } from 'frames.js/next';
import { APP_URL } from '@/data';

import { frames } from '../../frames/frames';
// @ts-ignore
export const POST = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/cast-frames/frame/', '');
  return await getFrameById(parseInt(frameId), ctx);
});

const getFrameById = async (frameId: number, ctx: any) => {
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
        </Button>
      ],

      image: <span>Generate your AI image</span>,
      state: { generateCount: 1, ...state },
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
    if (ctx.message.buttonIndex === 1 && ctx.message.inputText !== '') {
      state.redirectLink = ctx.message.inputText;
    }
    const { publicAddress, balance } = await getPublicAddressAndBalance(fid);
    state.custodialAddress = publicAddress;
    state.balance = balance;
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
    const allowedMints = ctx.message.inputText as string;
    state.allowedMints = parseInt(allowedMints);
    if (isNaN(state.allowedMints) || state.allowedMints < 1) {
      return {
        buttons: [
          <Button
            target={`${APP_URL}/cast-frames/frame/${frameId}`}
            key="continueButton4"
            action="post"
          >
            Continue
          </Button>
        ],
        image: <span>No of mints needs to be atleast 1</span>,
        state: {
          ...state
        },
        textInput: 'Please enter No of Mints'
      };
    }
    state.evmAddress = '';
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
      image: <span>Top up gas ETH</span>,
      state: {
        ...state
      },
      imageRatio: '1:1'
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
      imageOptions: {
        aspectRatio: '1:1'
      },
      state: {
        ...state
      },
      textInput: 'Name of the Mint',
      image: imageUrl
    };
  } else if (frameId === 9) {
    const state = ctx.state || {};
    const name = ctx.message.inputText;
    if (name === '') {
      return {
        buttons: [
          <Button
            target={`${APP_URL}/cast-frames/frame/${frameId}`}
            key="continueButton4"
            action="post"
          >
            Continue
          </Button>
        ],
        imageOptions: {
          aspectRatio: '1:1'
        },
        image: <span>Please enter a name for the mint</span>,
        textInput: 'Enter a name for the mint',
        state: {
          ...state
        }
      };
    }
    const createFrameBody = {
      redirectLink: state?.redirectLink || '',
      allowedMints: state?.allowedMints || 1,
      metadata: {
        name: name
      },
      imageUri: state.imageUrl || '',
      gatedCollections: 'farcaster',
      evm_address: state.evmAddress,
      fid: ctx.message.requesterFid,
      chainId: framesConfig.chainId,
      gatedChannels: 'farcaster',
      isRecast: state.recast,
      isFollow: state.follow,
      isLike: state.like,
      isTopUp: true
    };
    const data = await createFrameApi(createFrameBody);
    if (data.frameId === undefined) {
      return {
        buttons: [
          <Button
            target={`${APP_URL}/cast-frames/frame/9`}
            key="continueButton4"
            action="post"
          >
            Retry
          </Button>
        ],
        image: <span>Please retry there was some error</span>,
        textInput: 'Enter a name for the mint',
        state: {
          ...state
        }
      };
    }
    const linkToShare = `https://warpcast.com/~/compose?text=Created%20using%20Poster!&embeds[]=${framesConfig.framesURL}/${data.frameId}`;
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
