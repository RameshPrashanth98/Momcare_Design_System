import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { shadows } from "../../../tokens/shadows";

// ─── CSS box-shadow from RN shadow token ──────────────────────────────────────

function toBoxShadow(key: string, shadow: typeof shadows[keyof typeof shadows]): string {
  if (key === "inner") {
    return "inset 0px 2px 4px rgba(0,0,0,0.06)";
  }
  const { shadowOffset, shadowRadius, shadowOpacity } = shadow;
  return `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius}px rgba(0,0,0,${shadowOpacity})`;
}

// ─── Elevation Page ───────────────────────────────────────────────────────────

function ElevationPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Elevation Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 8 }}>
        Shadow levels derived from React Native shadow tokens. Rendered here as CSS box-shadow.
      </p>
      <p style={{ fontSize: 12, color: "#A8A8A8", marginBottom: 40, fontStyle: "italic" }}>
        Conversion: shadowOffset (x/y) + shadowRadius (blur) + shadowOpacity → box-shadow rgba.
        Android elevation value shown as label.
      </p>

      <section>
        <div className="flex flex-wrap gap-8">
          {(Object.entries(shadows) as [keyof typeof shadows, typeof shadows[keyof typeof shadows]][]).map(
            ([key, shadow]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 120,
                    height: 80,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 8,
                    boxShadow: toBoxShadow(key, shadow),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#737373", fontFamily: "monospace" }}>{key}</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontFamily: "monospace", color: "#525252", fontWeight: 600 }}>
                    {key}
                  </div>
                  <div style={{ fontSize: 11, color: "#A8A8A8" }}>
                    elevation: {shadow.elevation}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Token values table */}
      <section className="mt-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 16, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Token Values
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "monospace" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #E8E8E8" }}>
                {["Token", "offsetX", "offsetY", "blur", "opacity", "elevation", "CSS box-shadow"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: "#737373", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(Object.entries(shadows) as [string, typeof shadows[keyof typeof shadows]][]).map(([key, s]) => (
                <tr key={key} style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <td style={{ padding: "8px 12px", color: "#3D3D3D" }}>{key}</td>
                  <td style={{ padding: "8px 12px", color: "#737373" }}>{s.shadowOffset.width}px</td>
                  <td style={{ padding: "8px 12px", color: "#737373" }}>{s.shadowOffset.height}px</td>
                  <td style={{ padding: "8px 12px", color: "#737373" }}>{s.shadowRadius}px</td>
                  <td style={{ padding: "8px 12px", color: "#737373" }}>{s.shadowOpacity}</td>
                  <td style={{ padding: "8px 12px", color: "#737373" }}>{s.elevation}</td>
                  <td style={{ padding: "8px 12px", color: "#525252" }}>{toBoxShadow(key, s)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof ElevationPage> = {
  title: "Design Tokens/Elevation",
  component: ElevationPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ElevationPage>;

export const Default: Story = {};
