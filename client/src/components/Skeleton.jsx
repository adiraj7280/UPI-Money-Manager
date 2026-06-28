export default function Skeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-[#E8E0D0] p-4 mb-2.5 animate-pulse">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EDE8DF]" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-[#EDE8DF] rounded w-3/4" />
              <div className="h-3 bg-[#EDE8DF] rounded w-1/4" />
            </div>
            <div className="w-16 h-4 bg-[#EDE8DF] rounded mt-1" />
          </div>
          <div className="border-t border-[#EDE8DF] mt-3 pt-3 flex justify-between">
            <div className="w-20 h-5 bg-[#EDE8DF] rounded-full" />
            <div className="w-24 h-6 bg-[#EDE8DF] rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
}
