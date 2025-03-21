import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ImageTest() {
  return (
    <>
      <Head>
        <title>Image Test</title>
      </Head>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Image Test Page</h1>
        <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Image 1: /images/gym1enhance.webp</h2>
            <img 
              src="/images/gym1enhance.webp" 
              alt="Gym 1" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Image 2: /images/gym2enhance.webp</h2>
            <img 
              src="/images/gym2enhance.webp" 
              alt="Gym 2" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Image 3: /images/gym3enhance.jpg</h2>
            <img 
              src="/images/gym3enhance.jpg" 
              alt="Gym 3" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-2">Image 4: /images/gym4.jpg</h2>
            <img 
              src="/images/gym4.jpg" 
              alt="Gym 4" 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
} 