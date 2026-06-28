import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-stone-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2.5 bg-white border border-[#E8E0D0] rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors shadow-sm"
        placeholder="Search merchants, VPAs, refs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
          onClick={() => onChange('')}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
