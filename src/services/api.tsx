'use server';
export interface Props {
  results: ProductsData[];
}

export interface ProductsData {
  title: string;
}
export const fetchingProduct = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data: Props = await res.json();

  return data.products;
};

export const fetchProductData = async (productId) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow the error to handle it where the function is called
  }
};

// fetchProducts.ts

export async function fetchFilteredProducts(
  query: string,
  currentPage: number
) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}&_page=${currentPage}`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array in case of error
  }
}
