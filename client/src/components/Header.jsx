import { TrendingUp } from 'lucide-react';
import LiveIndicator from './LiveIndicator';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-10 border-b border-[#E8E0D0] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-stone-900">
        <TrendingUp size={20} />
        <h1 className="text-lg font-semibold font-sans tracking-tight">UPI Money Manager</h1>
      </div>
      <LiveIndicator />
    </header>
  );
}
