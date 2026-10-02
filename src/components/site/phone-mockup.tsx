import { Bot, LineChart, ShieldCheck, Zap } from "lucide-react";

interface PhoneMockupProps {
  title?: string;
  type?: "app" | "ai" | "analytics";
  className?: string;
}

export function PhoneMockup({ title = "AJETAN Mobile OS", type = "app", className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[320px] ${className}`}>
      {/* Phone Frame Outer Shadow & Glow */}
      <div className="absolute -inset-2 rounded-[48px] bg-gradient-to-tr from-red-600/30 via-rose-500/20 to-red-800/30 blur-xl opacity-60" />

      {/* Frame Body */}
      <div className="relative overflow-hidden rounded-[42px] border-4 border-slate-700/60 bg-slate-950 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-white/20">
        {/* Dynamic Notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 z-30 h-4 w-24 -translate-x-1/2 rounded-full bg-black flex items-center justify-end px-2">
          <div className="size-2 rounded-full bg-red-500/80 animate-pulse" />
        </div>

        {/* Screen Content */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[32px] bg-slate-900 text-white flex flex-col justify-between pt-7 p-4 border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-rose-400">
              {title}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-[0.6rem] text-slate-400">Live</span>
            </div>
          </div>

          {/* Screen Body variations */}
          {type === "ai" ? (
            <div className="my-auto space-y-3">
              <div className="flex items-center gap-2 rounded-xl bg-red-950/60 p-2.5 border border-red-500/30">
                <Bot className="size-5 text-rose-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold">AI Assistant Ready</p>
                  <p className="text-[0.65rem] text-slate-400">Automating 12 tasks...</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-2.5 text-[0.7rem] text-slate-300">
                "System workflow optimized. Processing response times decreased by 42%."
              </div>
              <div className="flex justify-between items-center text-[0.65rem] text-slate-400 px-1">
                <span>Accuracy: 99.8%</span>
                <span className="text-emerald-400 font-medium">Synced</span>
              </div>
            </div>
          ) : type === "analytics" ? (
            <div className="my-auto space-y-3">
              <div className="rounded-xl bg-slate-800/80 p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Active Growth</span>
                  <LineChart className="size-4 text-rose-400" />
                </div>
                <p className="mt-1 text-xl font-bold text-white">+184.2%</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-red-600 to-rose-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[0.65rem]">
                <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                  <span className="text-slate-400">Speed Score</span>
                  <p className="font-bold text-emerald-400">99 / 100</p>
                </div>
                <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                  <span className="text-slate-400">Conversions</span>
                  <p className="font-bold text-rose-400">+34%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-600/30 to-rose-600/30 p-3 border border-red-500/30">
                <Zap className="size-6 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Fast Mobile Engine</p>
                  <p className="text-[0.65rem] text-slate-300">iOS & Android</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-2 text-[0.7rem]">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-rose-400"/> Encrypted Auth</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-2 text-[0.7rem]">
                  <span>Offline First DB</span>
                  <span className="text-slate-400">100%</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[0.6rem] text-slate-400">
            <span>AJETAN OS v2.4</span>
            <div className="h-1 w-12 rounded-full bg-slate-600 mx-auto" />
            <span>Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
