
import { useState, useEffect } from 'react';
import { Product, ProductsResponse } from '../types';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductsResponse = await response.json();
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
