'use client';

import ListProduct from '@/component/fetchProduct/fetchProduct';
import { useAppContext } from '@/providers/ContextAppProvider';

const Page = () => {
  const { name, setName } = useAppContext();
  return (
    <div>
      <div className=' p-14 bg-gray-50-100'>
        <span>{name}</span>
        <button onClick={() => setName('aaa')}>Click ini</button>
      </div>
      <ListProduct />
    </div>
  );
};

export default Page;
