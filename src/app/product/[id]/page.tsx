'use client';

import { fetchProductData } from '@/services/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data based on the product ID
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductData(params.id);
        setProduct(productData);
      } catch (error) {
        // Handle the error as needed
      }
    };
    fetchProduct();
  }, [params]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold mt-16'>{product.title}</h1>
      <p className='text-lg text-gray-700 my-12 text-center'>
        {product.description}
      </p>
      <Image
        width={800}
        height={800}
        src={product.thumbnail}
        alt={product.title}
        loading='eager'
        style={{ width: '500', height: '500' }}
        priority
      />
      <div className='grid grid-cols-3 gap-4 my-12'>
        {product.images.slice(0, 3).map((image: string, index: number) => (
          <div key={index}>
            <Image
              width={200}
              height={200}
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: 'auto', height: '150px' }}
            />
          </div>
        ))}
      </div>
      <p className='text-xl font-bold text-blue-600 my-16'>
        Price: ${product.price}
      </p>
    </div>
  );
}
