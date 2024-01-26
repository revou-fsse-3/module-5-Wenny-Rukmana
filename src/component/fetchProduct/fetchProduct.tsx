'use client';
import { ProductsData, fetchingProduct } from '@/services/api';
import { useEffect, useState } from 'react';

const ListProduct = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);

  const fetchProducts = async () => {
    const result = await fetchingProduct();
    setProducts(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListProduct;
