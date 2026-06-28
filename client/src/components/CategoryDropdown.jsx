import { useState } from 'react';
import { CATEGORY_CONFIG } from '../utils/categoryConfig';

export default function CategoryDropdown({ value, transactionId, onCategoryChange, autoTagged }) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onCategoryChange(transactionId, newValue);
  };

  return (
    <select
      value={localValue}
      onChange={handleChange}
      className="text-xs font-medium border border-[#E8E0D0] rounded-lg px-2.5 py-1.5 bg-[#F5F0E8] text-stone-600 hover:bg-[#EDE8DF] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 transition-colors duration-150 cursor-pointer"
    >
      {Object.keys(CATEGORY_CONFIG).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
