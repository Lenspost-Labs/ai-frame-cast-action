import Link from 'next/link';
import { appURL, currentURL } from '../../utils/common';
import { createDebugUrl } from '../../utils/debug';
import { fetchMetadata } from 'frames.js/next';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'New api example',
    description: 'This is a new api example',
    other: {
      ...(await fetchMetadata(new URL('/frames-hojayega/frames', appURL())))
    }
  };
}

export default async function Home() {
  const url = currentURL('/frames-hojayega/');

  return (
    <div>
      New api cast actions example.{' '}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
