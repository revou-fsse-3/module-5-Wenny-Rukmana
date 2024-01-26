import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar Component', () => {
  vi.mock('next/navigation', () => ({
    ...vi.importActual('next/navigation'),
    usePathname: vi.fn(),
  }));

  it('renders Navbar', () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeDefined();
  });

  it('applies active class to current route link', () => {
    // Mocking the usePathname function
    vi.mock('next/navigation', () => ({
      ...vi.importActual('next/navigation'),
      usePathname: vi.fn(() => '/product'),
    }));

    render(<Navbar />);
    const productLink = screen.getByRole('link', { name: /product/i });

    expect(productLink.classList).toContain('active-nav');
  });
  it('has correct links', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const productLink = screen.getByRole('link', { name: /product/i });

    // Check the 'href' attribute directly
    expect(homeLink.getAttribute('href')).toBe('/');
    expect(productLink.getAttribute('href')).toBe('/product');
  });
});
