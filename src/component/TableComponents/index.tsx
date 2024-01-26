'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFilteredProducts } from '../../services/api';

export default function Table({
  query,
  currentPage,
  className,
}: {
  query: string;
  currentPage: number;
  className: string;
}) {
  const [products, setProducts] = useState<any[]>([]);

  // Fetch products using the utility function
  useEffect(() => {
    async function fetchProducts() {
      const filteredProducts = await fetchFilteredProducts(query, currentPage);
      setProducts(filteredProducts);
    }
    fetchProducts();
  }, [query, currentPage]);

  return (
    <div>
      <ul className='list-none'>
        {products.map((product: any) => (
          <li className={className} key={product.id} style={{ width: '100%' }}>
            {/* Wrap each product title with Link */}
            <Link href={`/product/${product.id}`} passHref>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
