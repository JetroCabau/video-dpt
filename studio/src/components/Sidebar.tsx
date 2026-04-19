"use client";
import { useTheme } from "@/lib/themeContext";
import * as base from "@/lib/theme";

const BG_CONTROLS: { label: string; key: keyof typeof base.colors.background }[] = [
  { label: "Dark",       key: "blueDark"    },
  { label: "Velvet",     key: "velvet"      },
  { label: "Deep",       key: "velvetDark"  },
  { label: "Light",      key: "primary"     },
  { label: "Secondary",  key: "secondary"   },
];

const TEXT_CONTROLS: { label: string; key: keyof typeof base.colors.text }[] = [
  { label: "Primary",  key: "primary"           },
  { label: "Inverse",  key: "inverse"            },
  { label: "Accent",   key: "velvetLightSubtle"  },
  { label: "Velvet",   key: "velvet"             },
];

const HEADING_CONTROLS: { label: string; key: keyof typeof base.typography.heading; min: number; max: number }[] = [
  { label: "6XL (Display)", key: "6xl",  min: 48,  max: 192 },
  { label: "5XL (Large)",   key: "5xl",  min: 32,  max: 128 },
  { label: "4XL (Medium)",  key: "4xl",  min: 24,  max: 96  },
  { label: "3XL (Small)",   key: "3xl",  min: 16,  max: 72  },
];

function ColorRow({
  label, value, baseValue, onChange,
}: { label: string; value: string; baseValue: string; onChange: (v: string) => void }) {
  const dirty = value !== baseValue;
  return (
    <div className="flex items-center gap-2.5">
      <span className={`text-xs flex-1 truncate ${dirty ? "text-[#ee83e3]" : "text-[#73667d]"}`}>{label}</span>
      <span className="text-[#2c1a3d] text-xs font-mono hidden xl:block">{value}</span>
      <label className="relative w-7 h-7 rounded-md cursor-pointer overflow-hidden border border-[#2c1a3d] hover:border-[#831b84] transition-colors shrink-0">
        <div className="absolute inset-0 rounded-md" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
    </div>
  );
}

export function Sidebar() {
  const { colors, typography, overrides, setBg, setText, setHeadingSize, reset } = useTheme();
  const hasOverrides =
    Object.keys(overrides.bg).length > 0 ||
    Object.keys(overrides.text).length > 0 ||
    Object.keys(overrides.headingSize).length > 0;

  return (
    <aside className="w-72 h-screen flex flex-col bg-[#08000f] border-r border-[#150027] overflow-hidden shrink-0">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-[#150027]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md shrink-0"
            style={{ background: "linear-gradient(135deg, #e9606c, #d03dae, #8017f9)" }}
          />
          <div>
            <p className="text-white text-sm font-medium leading-none">Xebia Studio</p>
            <p className="text-[#443352] text-xs mt-0.5">Design Preview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Colors — Backgrounds */}
        <section className="px-5 py-4 border-b border-[#150027]">
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">background</p>
          <div className="flex flex-col gap-2.5">
            {BG_CONTROLS.map(({ label, key }) => (
              <ColorRow
                key={key}
                label={label}
                value={colors.background[key]}
                baseValue={base.colors.background[key]}
                onChange={(v) => setBg(key, v)}
              />
            ))}
          </div>
        </section>

        {/* Colors — Text */}
        <section className="px-5 py-4 border-b border-[#150027]">
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">text</p>
          <div className="flex flex-col gap-2.5">
            {TEXT_CONTROLS.map(({ label, key }) => (
              <ColorRow
                key={key}
                label={label}
                value={colors.text[key]}
                baseValue={base.colors.text[key]}
                onChange={(v) => setText(key, v)}
              />
            ))}
          </div>
        </section>

        {/* Gradient swatch */}
        <section className="px-5 py-4 border-b border-[#150027]">
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">gradient</p>
          <div
            className="h-6 rounded-md"
            style={{ background: `linear-gradient(to right, ${base.colors.gradient.join(", ")})` }}
          />
        </section>

        {/* Typography */}
        <section className="px-5 py-4 border-b border-[#150027]">
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">typography</p>
          <div className="bg-[#0e0020] rounded-lg px-3 py-2 mb-4">
            <p className="text-[#443352] text-xs mb-0.5">family</p>
            <p className="text-[#73667d] text-xs font-mono truncate">{base.typography.family}</p>
          </div>
          <div className="flex flex-col gap-4">
            {HEADING_CONTROLS.map(({ label, key, min, max }) => {
              const current = typography.heading[key].size;
              const dirty = current !== base.typography.heading[key].size;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`text-xs ${dirty ? "text-[#ee83e3]" : "text-[#73667d]"}`}>{label}</label>
                    <span className={`text-xs font-mono ${dirty ? "text-[#e331d0]" : "text-[#443352]"}`}>
                      {current}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={current}
                    onChange={(e) => setHeadingSize(key, Number(e.target.value))}
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#831b84" }}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Spacing scale */}
        <section className="px-5 py-4">
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">spacing</p>
          <div className="flex flex-col gap-1.5">
            {(Object.entries(base.spacing) as [string, number][]).slice(1, 10).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="text-[#2c1a3d] text-xs font-mono w-8 shrink-0">{k}</span>
                <div
                  className="h-px rounded-full bg-[#500051]"
                  style={{ width: Math.min(v * 0.8, 120) }}
                />
                <span className="text-[#2c1a3d] text-xs font-mono">{v}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Reset */}
      <div className={`px-5 py-4 border-t border-[#150027] transition-opacity ${hasOverrides ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button
          onClick={reset}
          className="w-full py-2 rounded-lg border border-[#500051] text-[#ee83e3] text-xs hover:bg-[#500051]/20 transition-colors font-mono"
        >
          reset to defaults
        </button>
      </div>
    </aside>
  );
}
