import { colors } from "../../tokens/colors";

describe("Color tokens", () => {
  it("defines rose palette (50–950)", () => {
    expect(colors.rose[50]).toBeDefined();
    expect(colors.rose[500]).toBeDefined();
    expect(colors.rose[950]).toBeDefined();
  });
  it("defines cream palette", () => {
    expect(colors.cream[50]).toBeDefined();
    expect(colors.cream[500]).toBeDefined();
  });
  it("defines sage palette", () => {
    expect(colors.sage[50]).toBeDefined();
    expect(colors.sage[500]).toBeDefined();
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
});
