import { Sparkles } from 'lucide-react';
import { formatAmount } from '../utils/formatAmount';

export default function CashbackRow({ expectedSavings }) {
  return (
    <div className="mt-3 flex items-center gap-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-3 py-2.5 animate-fade-in">
      <Sparkles size={13} className="text-green-800" />
      <span className="text-xs font-medium text-green-800">
        Expected Savings: ₹{formatAmount(expectedSavings)} <span className="text-green-600 font-normal">· 2% reward</span>
      </span>
    </div>
  );
}
