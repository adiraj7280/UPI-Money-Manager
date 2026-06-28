import { Wifi } from 'lucide-react';

export default function LiveIndicator() {
  return (
    <div className="flex items-center gap-1.5 bg-white border border-[#E8E0D0] rounded-full px-3 py-1.5">
      <div className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
      </div>
      <Wifi size={12} className="text-amber-500" />
      <span className="text-xs text-stone-400 font-medium">Live</span>
    </div>
  );
}
