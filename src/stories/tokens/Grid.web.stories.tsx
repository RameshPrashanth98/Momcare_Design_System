import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { breakpoints } from "../../../tokens/grid";

// ─── Breakpoint descriptions ──────────────────────────────────────────────────

const breakpointDescriptions: Record<string, string> = {
  sm: "Tablet threshold — 8-column layout begins",
  md: "Wide tablet — 12-column layout begins",
  lg: "Desktop / large tablet landscape",
  xl: "Wide desktop",
};

// ─── Grid columns visual ──────────────────────────────────────────────────────

function GridColumns({ count, gap, label }: { count: number; gap: number; label: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#3D3D3D", marginBottom: 8 }}>{label}</h3>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${count}, 1fr)`, gap }}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            style={{
              height: 48,
              backgroundColor: "#FAE8EC",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "#C4697A", fontFamily: "monospace" }}>{i + 1}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#A8A8A8", marginTop: 8 }}>
        {count} columns — {gap}px gutter
      </p>
    </div>
  );
}

// ─── Grid Page ────────────────────────────────────────────────────────────────

function GridPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Grid & Breakpoint Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Responsive breakpoints and column grid structure for mobile, tablet, and desktop.
      </p>

      {/* Breakpoints Table */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 16, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Breakpoints
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E8E8E8" }}>
              {["Token", "Value", "Description"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "6px 16px 6px 0", color: "#737373", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(Object.entries(breakpoints) as [string, string][]).map(([key, val]) => (
              <tr key={key} style={{ borderBottom: "1px solid #F5F5F5" }}>
                <td style={{ padding: "10px 16px 10px 0", fontFamily: "monospace", color: "#3D3D3D" }}>{key}</td>
                <td style={{ padding: "10px 16px 10px 0", fontFamily: "monospace", color: "#737373" }}>{val}</td>
                <td style={{ padding: "10px 0", color: "#525252" }}>{breakpointDescriptions[key] ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Grid Diagrams */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Grid Structure
        </h2>
        <GridColumns count={4}  gap={16} label="Mobile — 4-column grid (360px, 16px gutter)" />
        <GridColumns count={8}  gap={24} label="Tablet — 8-column grid (768px, 24px gutter)" />
        <GridColumns count={12} gap={32} label="Desktop — 12-column grid (1280px, 32px gutter)" />
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof GridPage> = {
  title: "Design Tokens/Grid",
  component: GridPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof GridPage>;

export const Default: Story = {};
