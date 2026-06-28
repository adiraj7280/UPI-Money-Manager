import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import ProgressTrack from './ProgressTrack';
import { CATEGORY_CONFIG } from '../utils/categoryConfig';
import { formatAmount } from '../utils/formatAmount';

export default function AnalyticsBlock({ summary, loading }) {
  if (loading || !summary) {
    return (
      <div className="bg-[#F5F0E8] border-b border-[#E8E0D0] px-6 py-6 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 bg-[#E8E0D0] rounded w-1/3"></div>
          <div className="h-5 bg-[#E8E0D0] rounded w-1/3"></div>
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex justify-between mb-1.5">
              <div className="h-4 bg-[#E8E0D0] rounded w-1/4"></div>
              <div className="h-4 bg-[#E8E0D0] rounded w-1/6"></div>
            </div>
            <div className="w-full bg-[#E8E0D0] rounded-full h-1.5"></div>
          </div>
        ))}
      </div>
    );
  }

  const { totalCredit, totalDebit, byCategory, maxCategoryValue } = summary;

  return (
    <div className="bg-[#F5F0E8] border-b border-[#E8E0D0] px-6 py-6">
      <div className="flex justify-between items-center mb-6 sm:flex-row flex-col sm:gap-0 gap-2">
        <h2 className="text-stone-400 text-xs font-sans font-medium uppercase tracking-widest">Spending Overview</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-green-700">
            <ArrowDownLeft size={14} />
            <span className="font-mono text-sm font-semibold">₹{formatAmount(totalCredit)}</span>
          </div>
          <div className="w-px h-4 bg-[#E8E0D0]"></div>
          <div className="flex items-center gap-1.5 text-red-700">
            <ArrowUpRight size={14} />
            <span className="font-mono text-sm font-semibold">₹{formatAmount(totalDebit)}</span>
          </div>
        </div>
      </div>
      
      <div>
        {Object.entries(CATEGORY_CONFIG).map(([label, config]) => {
          const amount = byCategory[label] || 0;
          const percent = maxCategoryValue === 0 ? 0 : (amount / maxCategoryValue * 100).toFixed(1);
          return (
            <ProgressTrack 
              key={label}
              label={label}
              amount={amount}
              percent={percent}
              color={config.color}
              icon={config.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
