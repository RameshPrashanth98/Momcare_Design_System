import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// ─── Icon Size Tokens (inline — no token file yet) ────────────────────────────

const iconSizes = [
  { name: "icon-sm",  px: 16,  usage: "inline / label icons" },
  { name: "icon-md",  px: 20,  usage: "default UI icons" },
  { name: "icon-lg",  px: 24,  usage: "navigation icons" },
  { name: "icon-xl",  px: 32,  usage: "hero / feature icons" },
  { name: "icon-2xl", px: 48,  usage: "illustration placeholders" },
];

// ─── Icon examples (emoji proxies — Phosphor Icons not yet installed) ─────────

const iconExamples = [
  { emoji: "♥",  name: "Heart",    usage: "favorite / save"       },
  { emoji: "🏠", name: "House",    usage: "home navigation"        },
  { emoji: "📅", name: "Calendar", usage: "appointment booking"    },
  { emoji: "🔔", name: "Bell",     usage: "notifications"          },
  { emoji: "👤", name: "User",     usage: "profile"                },
  { emoji: "⚙️", name: "Gear",     usage: "settings"               },
  { emoji: "💊", name: "Pill",     usage: "medication"             },
  { emoji: "🏥", name: "Hospital", usage: "clinic / provider"      },
];

// ─── SVG Circle placeholder ───────────────────────────────────────────────────

function IconCircle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#E8A4B0" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="#E8A4B0" />
    </svg>
  );
}

// ─── Iconography Page ─────────────────────────────────────────────────────────

function IconographyPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#171717", marginBottom: 4 }}>
        Iconography Tokens
      </h1>
      <p style={{ fontSize: 14, color: "#737373", marginBottom: 40 }}>
        Icon size scale and usage guidelines for Phosphor Icons.
      </p>

      {/* Icon Sizes */}
      <section className="mb-12">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 24, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Icon Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, paddingBottom: 8, borderBottom: "2px solid #E8E8E8", marginBottom: 4 }}>
            <span style={{ width: 100, fontSize: 11, fontWeight: 600, color: "#737373", fontFamily: "monospace" }}>Token</span>
            <span style={{ width: 60,  fontSize: 11, fontWeight: 600, color: "#737373" }}>Size</span>
            <span style={{ width: 60,  fontSize: 11, fontWeight: 600, color: "#737373" }}>Visual</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#737373" }}>Usage</span>
          </div>
          {iconSizes.map(({ name, px, usage }) => (
            <div
              key={name}
              style={{ display: "flex", alignItems: "center", gap: 24, paddingTop: 12, paddingBottom: 12, borderBottom: "1px solid #F5F5F5" }}
            >
              <span style={{ width: 100, fontSize: 12, fontFamily: "monospace", color: "#525252", flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ width: 60, fontSize: 12, color: "#737373", flexShrink: 0 }}>
                {px}px
              </span>
              <div style={{ width: 60, display: "flex", alignItems: "center", flexShrink: 0 }}>
                <IconCircle size={px} />
              </div>
              <span style={{ fontSize: 12, color: "#737373" }}>{usage}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Icon Examples */}
      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#262626", marginBottom: 12, borderBottom: "1px solid #E8E8E8", paddingBottom: 8 }}>
          Icon Examples (Phosphor Icons)
        </h2>
        <div style={{ backgroundColor: "#FDF5F0", border: "1px solid #FAE8EC", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#C4697A", margin: 0 }}>
            <strong>Note:</strong> Actual icons use <code style={{ fontFamily: "monospace", fontSize: 12 }}>phosphor-react</code> — install with{" "}
            <code style={{ fontFamily: "monospace", fontSize: 12 }}>npm install phosphor-react</code>. Token sizes: sm=16px, md=20px (default UI), lg=24px (nav), xl=32px (hero), 2xl=48px (illustration).
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
          {iconExamples.map(({ emoji, name, usage }) => (
            <div
              key={name}
              style={{
                backgroundColor: "#FAFAFA",
                border: "1px solid #E8E8E8",
                borderRadius: 8,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 24 }} role="img" aria-label={name}>{emoji}</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#525252" }}>{name}</span>
              <span style={{ fontSize: 10, color: "#A8A8A8", textAlign: "center" }}>{usage}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof IconographyPage> = {
  title: "Design Tokens/Iconography",
  component: IconographyPage,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof IconographyPage>;

export const Default: Story = {};
