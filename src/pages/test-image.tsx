import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function TestImage() {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});

  const testImages = [
    '/images/gymdemo1.jpg',
    '/images/gymdemo2.jpg',
    '/images/gymdemo3.jpg',
    '/images/gymdemo4.jpg',
    // Test with direct URL too
    '/gymdemo1.jpg',
  ];

  const handleImageLoad = (path: string) => {
    setImageStatus(prev => ({
      ...prev,
      [path]: true
    }));
    console.log(`Image loaded successfully: ${path}`);
  };

  const handleImageError = (path: string) => {
    setImageStatus(prev => ({
      ...prev,
      [path]: false
    }));
    console.error(`Image failed to load: ${path}`);
  };

  return (
    <>
      <Head>
        <title>Image Test Page</title>
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Image Loading Test</h1>
        
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:underline">
          Back to Home
        </Link>

        <div className="space-y-8">
          {testImages.map((path, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <p className="mb-2 font-medium">Testing image: {path}</p>
              
              <div className="relative h-64 w-full bg-gray-200 mb-2">
                <Image
                  src={path}
                  alt={`Test image ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  onLoad={() => handleImageLoad(path)}
                  onError={() => handleImageError(path)}
                />
              </div>
              
              {imageStatus[path] === true && (
                <p className="text-green-600">✓ Image loaded successfully</p>
              )}
              
              {imageStatus[path] === false && (
                <p className="text-red-600">✗ Failed to load image</p>
              )}
              
              <div className="mt-2">
                <p className="text-sm text-gray-600">Direct URL: <a href={path} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{path}</a></p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Regular Image Tags Test</h2>
          <div className="space-y-4">
            {testImages.map((path, index) => (
              <div key={`img-${index}`} className="border p-4 rounded-lg">
                <p className="mb-2">Standard img tag: {path}</p>
                <img 
                  src={path} 
                  alt={`Standard test ${index + 1}`} 
                  className="h-32 object-contain bg-gray-200" 
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 