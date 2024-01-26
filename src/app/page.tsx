import Search from '@/component/SearchInput/Index';
import Table from '@/component/TableComponents';
import { Suspense } from 'react';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <nav className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-row items-center'>
        <div className='m-8 flex items-center justify-between gap-2'>
          <Search
            className='w-full md:w-96 rounded-md border-2 border-gray-300  focus:bg-slate-50 py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='sofa, t-shirt, iphone...'
          />
        </div>
      </div>
      <div className='absolute top-50 right-10 overflow-y-auto max-h-96 '>
        {query && (
          <Suspense key={query + currentPage}>
            <Table
              className=' bg-gray-100 p-3 mt-2 rounded-lg hover:bg-slate-200 text-sm w-full '
              query={query}
              currentPage={currentPage}
            />
          </Suspense>
        )}
      </div>
    </nav>
  );
}
