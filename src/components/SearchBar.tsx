import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder = 'Search games...' }) => {
  return (
    <div className="relative max-w-sm md:max-w-md w-full mx-auto mb-4 md:mb-8">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 md:h-5 md:w-5 text-white/40" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-navy-800 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors duration-200 text-sm md:text-base"
        className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-gradient-to-r from-red-900/50 to-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gold-300/60 focus:outline-none focus:border-gold-400 focus:shadow-lg focus:shadow-gold-500/20 transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
      />
    </div>
  );
};

export default SearchBar;