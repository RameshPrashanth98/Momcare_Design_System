import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { semanticColors } from "../../../tokens/colors";

// ─── Border width scale (inline — no token file for border widths) ────────────

const borderWidths = [
  { name: "border-0", value: "0px"  },
  { name: "border-1", value: "1px"  },
  { name: "border-2", value: "2px"  },
  { name: "border-4", value: "4px"  },
  { name: "border-8", value: "8px"  },
];

// ─── Border Page ──────────────────────────────────────────────────────────────

function BorderPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Border Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Border widths and color tokens used across the design system.
      </p>

      {/* Border Widths */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Border Widths
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {borderWidths.map(({ name, value }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ width: 100, fontSize: 12, fontFamily: "monospace", color: "#525252", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ width: 40, fontSize: 12, color: "#737373", flexShrink: 0 }}>
                {value}
              </span>
              <div
                style={{
                  flex: 1,
                  maxWidth: 400,
                  borderTopWidth: value,
                  borderTopStyle: "solid",
                  borderTopColor: "#737373",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Border Colors */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Border Color Tokens
        </h2>
        <div className="flex flex-wrap gap-6">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: 160,
                height: 64,
                border: `2px solid ${semanticColors.borderDefault}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "#737373" }}>border-default</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#525252" }}>
              border-default
            </span>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#A8A8A8" }}>
              {semanticColors.borderDefault}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: 160,
                height: 64,
                border: `2px solid ${semanticColors.borderSubtle}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "#737373" }}>border-subtle</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#525252" }}>
              border-subtle
            </span>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#A8A8A8" }}>
              {semanticColors.borderSubtle}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof BorderPage> = {
  title: "Design Tokens/Border",
  component: BorderPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof BorderPage>;

export const Default: Story = {};
