import { memo } from 'react';
import { ArrowDownLeft, ArrowUpRight, Zap } from 'lucide-react';
import CategoryDropdown from './CategoryDropdown';
import CashbackRow from './CashbackRow';
import { timeAgo } from '../utils/timeAgo';
import { formatAmount } from '../utils/formatAmount';

const TransactionCard = memo(({ transaction, onCategoryChange }) => {
  const isCredit = transaction.type === 'credit';
  const IconClass = isCredit ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700';
  const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
  const amountColor = isCredit ? 'text-green-700' : 'text-red-700';
  const amountPrefix = isCredit ? '+' : '-';

  return (
    <div className={`bg-white rounded-2xl border border-[#E8E0D0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 mb-2.5 border-l-4 animate-slide-in ${isCredit ? 'border-l-green-700' : 'border-l-red-700'}`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-start">
          <div className={`p-1.5 rounded-lg ${IconClass}`}>
            <Icon size={16} />
          </div>
          <div>
            <div className="text-sm font-medium text-stone-900 line-clamp-2 sm:line-clamp-none">{transaction.description}</div>
            <div className="text-xs text-stone-400 mt-0.5">{timeAgo(transaction.timestamp)}</div>
          </div>
        </div>
        <div className={`font-mono text-sm font-semibold ${amountColor} shrink-0 ml-2`}>
          {amountPrefix}₹{formatAmount(transaction.amount)}
        </div>
      </div>
      
      <div className="border-t border-[#EDE8DF] mt-3 pt-3 flex justify-between items-center">
        {transaction.autoTagged ? (
          <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1">
            <Zap size={11} /> Auto-tagged
          </div>
        ) : (
          <div /> // Spacer
        )}
        <CategoryDropdown 
          value={transaction.category} 
          transactionId={transaction.id} 
          onCategoryChange={onCategoryChange}
          autoTagged={transaction.autoTagged}
        />
      </div>

      {(transaction.vpa || transaction.rrn || transaction.bankAccount) && (
        <div className="bg-[#F8F6F0] rounded-lg p-2 mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-[11px] text-stone-500 font-mono">
          {transaction.bankAccount && <span>Bank: {transaction.bankAccount}</span>}
          {transaction.vpa && <span>VPA: {transaction.vpa}</span>}
          {transaction.rrn && <span>Ref: {transaction.rrn}</span>}
        </div>
      )}

      {transaction.cashbackRow && transaction.expectedSavings > 0 && (
        <CashbackRow expectedSavings={transaction.expectedSavings} />
      )}
    </div>
  );
});

export default TransactionCard;
