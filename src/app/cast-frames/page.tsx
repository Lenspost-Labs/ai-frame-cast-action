import { fetchMetadata } from 'frames.js/next';
import { APP_URL } from '@/data';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      ...(await fetchMetadata(new URL('cast-frames/frames', APP_URL)))
    },
    description: 'This is a new api example',
    title: 'New api example'
  };
}

export default async function Home() {
  return <div>New api cast actions example. </div>;
}
