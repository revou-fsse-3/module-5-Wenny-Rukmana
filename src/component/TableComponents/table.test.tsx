import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchFilteredProducts as mockFetchFilteredProducts } from '../../services/api';
import Table from './index';

vi.mock('../../services/api');

describe('Table', () => {
  it('renders products correctly', async () => {
    // Mock data to be returned by fetchFilteredProducts
    const mockProducts = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];

    // Mock the API function to return the mockProducts
    mockFetchFilteredProducts.mockResolvedValueOnce(mockProducts);

    // Render the Table component
    render(
      <Table query='someQuery' currentPage={1} className='list-product-item' />
    );

    // Wait for products to be fetched and rendered
    await waitFor(() => {
      // Check if products are rendered with correct titles
      expect(screen.getByText('Product 1')).toBeDefined();
      expect(screen.getByText('Product 2')).toBeDefined();
    });
  });
});
