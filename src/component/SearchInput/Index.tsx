'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({
  placeholder,
  className,
}: {
  placeholder: string;
  className: string;
}) {
  const searchParams = useSearchParams(); // Access the parameters of the current URL
  const pathName = usePathname(); // current URL pathname
  const { replace } = useRouter(); //

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching: ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`); // updates the URL with the user's search data
  }, 450);

  return (
    <div className='relative flex flex-col gap-2'>
      <label className='text-sm'>What are you looking for? </label>
      <input
        id='search'
        className={className}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
