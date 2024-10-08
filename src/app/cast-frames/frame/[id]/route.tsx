import {
  calculateTransactionFeeForMints,
  getPublicAddressAndBalance,
  createFrameApi
} from '@/services';
import { framesConfig, APP_URL } from '@/data';
import { Button } from 'frames.js/next';

import { frames } from '../../frames/frames';
// @ts-ignore
export const POST = frames(async (ctx) => {
  const frameId = ctx.url.pathname.replace('/cast-frames/frame/', '');
  return await getFrameById(parseInt(frameId), ctx);
});

const getFrameById = async (frameId: number, ctx: any) => {
  const newFrameId = frameId + 1;
  const state = ctx.state || {};
  const fid = ctx?.message?.requesterFid;
  const evm_address = ctx?.message?.requesterVerifiedAddresses?.[0];

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

      imageOptions: {
        aspectRatio: '1:1'
      },
      state: { generateCount: 1, ...state },
      image: '/assets/enter-prompt.gif',
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
          1
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          2
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          3
        </Button>,
        <Button
          target={`${APP_URL}/cast-frames/frame/${newFrameId}`}
          key="noButton"
          action="post"
        >
          Skip
        </Button>
      ],

      imageOptions: {
        aspectRatio: '1:1'
      },
      image: '/assets/pre-mint-tasks.gif',
      state: {
        ...state
      }
    };
  } else if (frameId === 3) {
    if (ctx.message.buttonIndex === 1) {
      state.like = true;
    } else if (ctx.message.buttonIndex === 2) {
      state.like = true;
      state.recast = true;
    } else if (ctx.message.buttonIndex === 3) {
      state.like = true;
      state.recast = true;
      state.follow = true;
    } else if (ctx.message.buttonIndex === 4) {
      state.like = false;
      state.recast = false;
      state.follow = false;
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
      imageOptions: {
        aspectRatio: '1:1'
      },
      textInput: 'Enter External URL (Optional)',
      image: '/assets/external-link.gif',
      state: {
        ...state
      }
    };
  } else if (frameId === 4) {
    if (ctx.message.buttonIndex === 1 && ctx.message.inputText !== '') {
      state.redirectLink = ctx.message.inputText;
    }
    const { publicAddress, balance } = await getPublicAddressAndBalance(
      fid,
      evm_address,
      framesConfig?.chainId
    );
    state.publicAddress = publicAddress;
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
      imageOptions: {
        aspectRatio: '1:1'
      },
      state: {
        ...state
      },
      image: '/assets/total-mints.gif',
      textInput: 'No of Mints'
    };
  } else if (frameId === 5) {
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
        imageOptions: {
          aspectRatio: '1:1'
        },
        state: {
          ...state
        },
        textInput: 'Please enter No of Mints',
        image: '/assets/minimum-1-mint.gif'
      };
    }
    const remaining_balance = await calculateTransactionFeeForMints({
      publicAddress: state.publicAddress,
      account: state.connectedAddress,
      chainId: framesConfig.chainId,
      mints: state.allowedMints,
      balance: state.balance
    });

    if (parseFloat(remaining_balance) <= 0) {
      const imageUrl = state.imageUrl;
      return {
        buttons: [
          <Button
            target={`${APP_URL}/cast-frames/frame/7`}
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
    }

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
      imageOptions: {
        aspectRatio: '1:1'
      },
      state: {
        ...state
      },
      image: '/assets/sponsor-gas.gif'
    };
  } else if (frameId === 6) {
    const imageUrl = state.imageUrl;
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
  } else if (frameId === 7) {
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
        textInput: 'Enter a name for the mint',
        image: '/assets/name-this-poster.gif',
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
      fid: ctx.message.requesterFid,
      chainId: framesConfig.chainId,
      gatedChannels: 'farcaster',
      evm_address: evm_address,
      isRecast: state.recast,
      isFollow: state.follow,
      isLike: state.like,
      isTopUp: true
    };

    let data;
    try {
      data = await createFrameApi(createFrameBody);
    } catch (error) {
      console.error('Failed to create frame:', error);
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
        image: <span>Failed to create frame. Please retry.</span>,
        imageOptions: {
          aspectRatio: '1:1'
        },
        textInput: 'Enter a name for the mint',
        state: {
          ...state
        }
      };
    }
    const linkToShare = `https://warpcast.com/~/compose?text=made%20from%20my%20feed%20with%20%40poster!&embeds[]=${framesConfig.framesURL}/${data.frameId}`;
    return {
      buttons: [
        <Button target={`${linkToShare}`} key="shareFrameButton" action="link">
          Share your frame link
        </Button>
      ],
      imageOptions: {
        aspectRatio: '1:1'
      },
      image: state.imageUrl
    };
  }
};
export const GET = POST;
