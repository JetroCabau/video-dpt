"use client";
import { useState } from "react";
import type { ComponentType } from "react";
import { PlayerWrapper } from "./PlayerWrapper";

interface PropDef {
  key: string;
  type: "string";
  placeholder: string;
  default: string;
}

interface Props {
  name: string;
  description: string;
  component: ComponentType<Record<string, unknown>>;
  durationInFrames: number;
  fps: number;
  propDefs: PropDef[];
}

export function CompositionCard({ name, description, component, durationInFrames, fps, propDefs }: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(propDefs.map((p) => [p.key, p.default]))
  );

  return (
    <div className="rounded-xl border border-[#2c1a3d] bg-[#0e0020] overflow-hidden flex flex-col">
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#2c1a3d]">
        <div className="w-2 h-2 rounded-full bg-[#831b84] shrink-0" />
        <div className="min-w-0">
          <h2 className="text-white text-sm font-medium leading-none">{name}</h2>
          <p className="text-[#73667d] text-xs mt-1">{description}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="text-[#443352] text-xs font-mono">{durationInFrames}f</span>
          <span className="text-[#2c1a3d]">·</span>
          <span className="text-[#443352] text-xs font-mono">{fps}fps</span>
        </div>
      </div>

      {/* Player */}
      <div className="p-4 bg-[#08000f]">
        <PlayerWrapper
          component={component}
          inputProps={values as Record<string, unknown>}
          durationInFrames={durationInFrames}
          fps={fps}
        />
      </div>

      {/* Props editor */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <div>
          <p className="text-[#443352] text-xs font-mono uppercase tracking-widest mb-3">props</p>
          <div className="flex flex-col gap-2">
            {propDefs.map((pd) => (
              <div key={pd.key} className="flex items-center gap-3">
                <label className="text-[#73667d] text-xs font-mono w-20 shrink-0">{pd.key}</label>
                <input
                  type="text"
                  value={values[pd.key] ?? ""}
                  placeholder={pd.placeholder}
                  onChange={(e) => setValues((p) => ({ ...p, [pd.key]: e.target.value }))}
                  className="flex-1 min-w-0 bg-[#150027] border border-[#2c1a3d] rounded-lg px-3 py-1.5 text-white text-xs font-mono outline-none focus:border-[#831b84] placeholder:text-[#2c1a3d] transition-colors"
                />
                <span className="text-[#2c1a3d] text-xs font-mono w-10 shrink-0 text-right">{pd.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Type signature */}
        <div className="rounded-lg bg-[#08000f] border border-[#150027] px-3 py-2.5 font-mono text-xs leading-relaxed">
          <span className="text-[#5b4d68]">{"<"}</span>
          <span className="text-[#9c499d]">{name}</span>
          {propDefs.map((pd) => (
            <span key={pd.key}>
              {" "}
              <span className="text-[#ee83e3]">{pd.key}</span>
              <span className="text-[#5b4d68]">=</span>
              <span className="text-[#73667d]">"…"</span>
            </span>
          ))}
          <span className="text-[#5b4d68]">{" />"}</span>
        </div>
      </div>
    </div>
  );
}
