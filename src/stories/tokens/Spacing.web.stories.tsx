import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { spacing } from "../../../tokens/spacing";

// ─── Spacing Page ─────────────────────────────────────────────────────────────

function SpacingPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Spacing Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        4px base grid — space-N = N * 4px. Used for padding, margin, and gap values.
      </p>

      <section>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, paddingBottom: 8, borderBottom: "2px solid #E8E8E8", marginBottom: 4 }}>
            <span style={{ width: 100, fontSize: 11, fontWeight: 600, color: "#737373", fontFamily: "monospace" }}>Token</span>
            <span style={{ width: 80, fontSize: 11, fontWeight: 600, color: "#737373" }}>Value (px)</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#737373" }}>Visual</span>
          </div>
          {Object.entries(spacing).map(([key, val]) => (
            <div
              key={key}
              style={{ display: "flex", alignItems: "center", gap: 24, paddingTop: 10, paddingBottom: 10, borderBottom: "1px solid #F5F5F5" }}
            >
              <span style={{ width: 100, fontSize: 12, color: "#525252", fontFamily: "monospace" }}>
                space-{key}
              </span>
              <span style={{ width: 80, fontSize: 12, color: "#737373" }}>
                {val}px
              </span>
              <div
                style={{ height: 16, backgroundColor: "#E8A4B0", borderRadius: 3, width: val }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof SpacingPage> = {
  title: "Design Tokens/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof SpacingPage>;

export const Default: Story = {};
