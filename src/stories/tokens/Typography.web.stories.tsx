import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { fontSize, fontFamily, fontWeight, lineHeight } from "../../../tokens/typography";

// ─── Typography Page ──────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Typography Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Morph Maternity type scale, font families, weights, and line heights.
      </p>

      {/* Type Scale */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Type Scale
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {Object.entries(fontSize).map(([step, { size, lineHeight: lh }]) => (
            <div
              key={step}
              style={{ display: "flex", alignItems: "baseline", gap: 24, borderBottom: "1px solid #F5F5F5", paddingBottom: 12, paddingTop: 12 }}
            >
              <span style={{ width: 40, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {step}
              </span>
              <span style={{ fontSize: size, lineHeight: `${lh}px`, color: "#262626", flex: 1 }}>
                The quick brown fox — Morph Maternity
              </span>
              <span style={{ fontSize: 11, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0, whiteSpace: "nowrap" }}>
                {size}px / {lh}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Font Families */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 16, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Font Families
        </h2>
        <p style={{ fontSize: 12, color: "#737373", marginBottom: 16, fontStyle: "italic" }}>
          Note: Font files must be placed in assets/fonts/ — see assets/fonts/INSTRUCTIONS.md.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(fontFamily).map(([name, families]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ width: 160, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ fontSize: 14, color: "#3D3D3D" }}>
                {(families as readonly string[]).join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Font Weights
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(fontWeight).map(([name, weight]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ width: 80, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ width: 40, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {weight}
              </span>
              <span style={{ fontSize: 20, fontWeight: Number(weight), color: "#262626" }}>
                Aa Bb Cc
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Line Heights
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(lineHeight).map(([name, ratio]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ width: 80, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ width: 40, fontSize: 12, color: "#A8A8A8", fontFamily: "monospace", flexShrink: 0 }}>
                {ratio}
              </span>
              <div style={{ flex: 1, maxWidth: 200, height: 4, backgroundColor: "#E8E8E8", borderRadius: 2 }}>
                <div style={{ width: `${Math.min(ratio / 2, 1) * 100}%`, height: "100%", backgroundColor: "#E8A4B0", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof TypographyPage> = {
  title: "Design Tokens/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof TypographyPage>;

export const Default: Story = {};
