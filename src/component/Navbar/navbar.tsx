'use client';
import Link from 'next/link';

import './style.css';

import { usePathname } from 'next/navigation';

{
  /* Get the current route */
}

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <nav className='nav-parent-container'>
      <div>
        <ul>
          <li>
            <Link href='/' className={currentRoute === '/' ? 'active-nav' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/product'
              className={currentRoute === '/product' ? 'active-nav' : ''}
            >
              Product
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
