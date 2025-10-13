import { getAllMemeInfo } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const memes = getAllMemeInfo();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Meme Browser</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <Link href={`/${meme.id}/generate`} key={meme.id}>
            <div className="block border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 h-full">
              <h2 className="text-xl font-bold mb-2 text-accentA">{meme.name}</h2>
              <p className="text-sm text-gray-600 mb-2">Popularity: {meme.popularity} hits</p>
              <p className="text-gray-800 text-sm">{meme.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}