import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { colors, semanticColors } from "../../../tokens/colors";

// ─── Swatch ──────────────────────────────────────────────────────────────────

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={{ backgroundColor: hex, width: 64, height: 64, borderRadius: 8, border: "1px solid #E8E8E8" }}
        aria-label={`${name}: ${hex}`}
      />
      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#525252", textAlign: "center" }}>
        {name}
      </span>
      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#A8A8A8" }}>
        {hex}
      </span>
    </div>
  );
}

// ─── Palette Section ──────────────────────────────────────────────────────────

function PaletteSection({ title, palette }: { title: string; palette: Record<string, string> }) {
  return (
    <div className="mb-8">
      <h3 style={{ fontSize: 13, fontWeight: 600, color: "#3D3D3D", marginBottom: 12, textTransform: "capitalize" }}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {Object.entries(palette).map(([key, hex]) => (
          <Swatch key={key} name={key} hex={hex} />
        ))}
      </div>
    </div>
  );
}

// ─── Color Page ───────────────────────────────────────────────────────────────

function ColorPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Morph Maternity brand palette — extracted from the HTML design spec.
      </p>

      {/* Brand Palette */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Brand Palette
        </h2>
        <PaletteSection title="Rose" palette={colors.rose} />
        <PaletteSection title="Cream" palette={colors.cream} />
        <PaletteSection title="Sage" palette={colors.sage} />
        <PaletteSection title="Neutral" palette={colors.neutral as unknown as Record<string, string>} />
      </section>

      {/* Status Colors */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Status Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(colors.status).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </section>

      {/* Semantic Aliases */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Semantic Aliases
        </h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(semanticColors).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof ColorPage> = {
  title: "Design Tokens/Color",
  component: ColorPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ColorPage>;

export const Default: Story = {};
