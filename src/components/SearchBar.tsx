import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder = 'Search games...' }) => {
  return (
    <div className="relative max-w-xs md:max-w-sm w-full mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-3 w-3 md:h-4 md:w-4 text-white/40" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-6 md:pl-8 pr-3 py-1.5 md:py-2 bg-navy-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors duration-200 text-xs md:text-sm"
      />
    </div>
  );
};

export default SearchBar;