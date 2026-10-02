import { useState, useEffect } from "react";
import { Paintbrush, Settings2, X, Palette, Type } from "lucide-react";
import { cn } from "@/lib/utils";

export function DesignerStudioControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "typography">("colors");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex size-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-800",
          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
      >
        <Paintbrush className="size-6 transition-transform group-hover:-rotate-12" />
      </button>

      {/* Control Panel */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-80 origin-bottom-right rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Settings2 className="size-4 text-red-600" />
            <span className="font-display text-sm font-extrabold tracking-widest text-slate-900 uppercase">
              Designer Studio
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab("colors")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-bold transition-colors",
              activeTab === "colors" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Palette className="size-3.5" /> Colors
          </button>
          <button
            onClick={() => setActiveTab("typography")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-xs font-bold transition-colors",
              activeTab === "typography" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Type className="size-3.5" /> Typography
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "colors" && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Accent (Crimson)</label>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-red-600 shadow-inner" />
                  <div className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-600">
                    #dc2626
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base Dark (Obsidian)</label>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-[#09090b] shadow-inner" />
                  <div className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-600">
                    #09090b
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base Light (Pure White)</label>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-white border border-slate-200 shadow-inner" />
                  <div className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-600">
                    #ffffff
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "typography" && (
            <div className="animate-in fade-in slide-in-from-left-4 space-y-4 duration-300">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-red-600">Headings</div>
                <div className="mt-1 font-display text-lg font-extrabold text-slate-900">Space Grotesk</div>
                <div className="mt-2 flex gap-1">
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-600">Tracking: -0.02em</span>
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-600">Weight: 700/800</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-[0.65rem] font-bold uppercase tracking-widest text-red-600">Body</div>
                <div className="mt-1 font-sans text-base font-medium text-slate-900">Manrope</div>
                <div className="mt-2 flex gap-1">
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-600">Tracking: Normal</span>
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-600">Weight: 400/500</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-200 pt-3 text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
            Active Theme: Red Graphic Designer
          </p>
        </div>
      </div>
    </div>
  );
}
