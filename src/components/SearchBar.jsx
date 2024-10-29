import React from 'react';
import { Search } from 'lucide-react'

export default function SearchBar({ search, setSearch }) {
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <div className='flex border-2 rounded-3xl bg-white border-solid border-[#444d5c]'>
                <input 
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    className='flex rounded-3xl border-none bg-inherit text-[#444d5c] w-[17rem] h-8 outline-none px-2.5 placeholder:text-[#444d5c] text-[15px]'
                    placeholder='Busca tu distrito... '
                />
            </div>

        </>
    );

};


