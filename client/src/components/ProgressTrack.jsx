import { formatAmount } from '../utils/formatAmount';

export default function ProgressTrack({ label, amount, percent, color, icon: IconComponent }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5 sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-1">
        <div className="flex items-center gap-2 text-stone-900">
          <IconComponent size={14} style={{ color }} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <span className="font-mono text-sm">₹{formatAmount(amount)}</span>
          <span className="text-xs text-stone-400 w-8 text-right">{percent}%</span>
        </div>
      </div>
      <div className="w-full bg-[#E8E0D0] rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-1.5 rounded-full progress-fill" 
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
