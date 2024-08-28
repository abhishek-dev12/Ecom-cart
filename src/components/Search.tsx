import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSearch} className="flex items-center border-b border-gray-300 py-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search something..."
          className="flex-grow outline-none"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;