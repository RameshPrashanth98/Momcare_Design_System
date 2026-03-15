import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { radius } from "../../../tokens/radius";

// ─── Radius Page ──────────────────────────────────────────────────────────────

function RadiusPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Border Radius Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Radius scale used for rounding corners across all components.
      </p>

      <section>
        <div className="flex flex-wrap gap-8">
          {Object.entries(radius).map(([name, val]) => {
            const cssRadius = val === 9999 ? "50%" : `${val}px`;
            return (
              <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#FAE8EC",
                    borderRadius: cssRadius,
                    border: "1px solid #F2C4CE",
                  }}
                />
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#525252" }}>
                  {name}
                </span>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#A8A8A8" }}>
                  {val === 9999 ? "9999px (50%)" : `${val}px`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Table view */}
      <section className="mt-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 16, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Token Values
        </h2>
        <table style={{ width: "auto", borderCollapse: "collapse", fontSize: 12, fontFamily: "monospace" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E8E8E8" }}>
              <th style={{ textAlign: "left", padding: "6px 24px 6px 0", color: "#737373", fontWeight: 600 }}>Token</th>
              <th style={{ textAlign: "left", padding: "6px 24px 6px 0", color: "#737373", fontWeight: 600 }}>Value</th>
              <th style={{ textAlign: "left", padding: "6px 0", color: "#737373", fontWeight: 600 }}>CSS</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(radius).map(([name, val]) => (
              <tr key={name} style={{ borderBottom: "1px solid #F5F5F5" }}>
                <td style={{ padding: "8px 24px 8px 0", color: "#3D3D3D" }}>radius.{name}</td>
                <td style={{ padding: "8px 24px 8px 0", color: "#737373" }}>{val}</td>
                <td style={{ padding: "8px 0", color: "#525252" }}>{val === 9999 ? "50%" : `${val}px`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof RadiusPage> = {
  title: "Design Tokens/Radius",
  component: RadiusPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof RadiusPage>;

export const Default: Story = {};
