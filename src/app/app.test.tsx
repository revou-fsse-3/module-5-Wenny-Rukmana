import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../component/SearchInput/Index';
import { Appwrapper, useAppContext } from '../providers/ContextAppProvider';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe('Search Component Test', () => {
  it('should able to read label text'),
    async () => {
      render(<Search />);
      expect(
        screen.findByText('What are you looking for?')
      ).toBeInTheDocument();
    };

  it('should able to read placeholder text'),
    async () => {
      render(<Search placeholder='example...' />);
      expect(
        await screen.findByPlaceholderText('example...')
      ).toBeInTheDocument();
    };

  it('updates input value on change', () => {
    const { getByPlaceholderText } = render(<Search placeholder='iphone' />);

    const inputElement = getByPlaceholderText('iphone');

    fireEvent.change(inputElement, {
      target: { value: 'sofa' },
    });

    expect(inputElement.value).toBe('sofa');
  });

  it('handles empty default value correctly', () => {
    const { getByPlaceholderText } = render(
      <Search placeholder='Enter text' />
    );
    expect(getByPlaceholderText('Enter text')).toBeDefined('');
  });
});

describe('CONTEXT API & HOOKS TEST', () => {
  const TestComponent = () => {
    const { name, setName } = useAppContext();

    return (
      <div>
        <div className='p-14 bg-gray-50-100'>
          <span>{name}</span>
          <button onClick={() => setName('SOLD')}>Click ini</button>
        </div>
      </div>
    );
  };

  it('should change name on button click', () => {
    render(
      <Appwrapper>
        <TestComponent />
      </Appwrapper>
    );

    const button = screen.getByText('Click ini');
    fireEvent.click(button);

    expect(screen.getByText('SOLD')).toBeDefined();
  });
});
