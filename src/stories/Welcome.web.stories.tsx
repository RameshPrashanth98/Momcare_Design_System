import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { colors, semanticColors } from "../../tokens/colors";
import { fontSize, fontFamily } from "../../tokens/typography";

// ─── Color Swatch ────────────────────────────────────────────────────────────

interface SwatchProps {
  name: string;
  hex: string;
}

function Swatch({ name, hex }: SwatchProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg border border-neutral-200 shadow-sm"
        style={{ backgroundColor: hex }}
        aria-label={`${name}: ${hex}`}
      />
      <span className="text-xs text-neutral-600 font-mono text-center leading-tight">
        {name}
      </span>
      <span className="text-xs text-neutral-400 font-mono">{hex}</span>
    </div>
  );
}

// ─── Palette Row ─────────────────────────────────────────────────────────────

function PaletteRow({ paletteName, palette }: { paletteName: string; palette: Record<string | number, string> }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-neutral-700 mb-3 capitalize">{paletteName}</h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(palette).map(([step, hex]) => (
          <Swatch key={step} name={String(step)} hex={hex} />
        ))}
      </div>
    </div>
  );
}

// ─── Welcome Component ────────────────────────────────────────────────────────

function WelcomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        Morph Maternity Design System
      </h1>
      <p className="text-base text-neutral-500 mb-10">
        Token showcase — colors and typography scale.
      </p>

      {/* ── Color Palette ── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6 border-b border-neutral-200 pb-2">
          Color Palette
        </h2>
        <PaletteRow paletteName="rose" palette={colors.rose} />
        <PaletteRow paletteName="cream" palette={colors.cream} />
        <PaletteRow paletteName="sage" palette={colors.sage} />
        <PaletteRow paletteName="neutral" palette={colors.neutral} />

        <h3 className="text-sm font-semibold text-neutral-700 mb-3 mt-6">Status</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(colors.status).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>

        <h3 className="text-sm font-semibold text-neutral-700 mb-3 mt-6">Semantic Aliases</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(semanticColors).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </section>

      {/* ── Typography Scale ── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-800 mb-6 border-b border-neutral-200 pb-2">
          Typography Scale
        </h2>
        <div className="space-y-4">
          {Object.entries(fontSize).map(([step, { size, lineHeight }]) => (
            <div key={step} className="flex items-baseline gap-4 border-b border-neutral-100 pb-3">
              <span className="w-12 text-sm text-neutral-400 font-mono shrink-0">{step}</span>
              <span
                className="text-neutral-900"
                style={{ fontSize: `${size}px`, lineHeight: `${lineHeight}px` }}
              >
                The quick brown fox — {size}px / {lineHeight}px
              </span>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-neutral-700 mb-4 mt-8">Font Families</h3>
        <div className="space-y-3">
          {Object.entries(fontFamily).map(([name, families]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-36 text-sm text-neutral-400 font-mono shrink-0">{name}</span>
              <span className="text-sm text-neutral-700">{(families as readonly string[]).join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof WelcomePage> = {
  title: "Design System/Welcome",
  component: WelcomePage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof WelcomePage>;

export const ColorAndTypography: Story = {};
