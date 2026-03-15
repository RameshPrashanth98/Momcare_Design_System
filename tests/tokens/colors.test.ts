import { colors } from "../../tokens/colors";

describe("Color tokens", () => {
  it("defines rose palette (named: blush, petal, mist, deep, dark)", () => {
    expect(colors.rose.blush).toBeDefined();
    expect(colors.rose.petal).toBeDefined();
    expect(colors.rose.mist).toBeDefined();
    expect(colors.rose.deep).toBeDefined();
    expect(colors.rose.dark).toBeDefined();
  });
  it("defines cream palette (named: warm, soft, mid)", () => {
    expect(colors.cream.warm).toBeDefined();
    expect(colors.cream.soft).toBeDefined();
    expect(colors.cream.mid).toBeDefined();
  });
  it("defines sage palette (named: light, mid, deep)", () => {
    expect(colors.sage.light).toBeDefined();
    expect(colors.sage.mid).toBeDefined();
    expect(colors.sage.deep).toBeDefined();
  });
  it("defines neutral palette", () => {
    expect(colors.neutral[50]).toBeDefined();
    expect(colors.neutral[900]).toBeDefined();
  });
  it("defines status colors (success, warning, error, info)", () => {
    expect(colors.status.success).toBeDefined();
    expect(colors.status.warning).toBeDefined();
    expect(colors.status.error).toBeDefined();
    expect(colors.status.info).toBeDefined();
  });
  it("rose.blush matches spec value #E8A4B0", () => {
    expect(colors.rose.blush).toBe("#E8A4B0");
  });
});
