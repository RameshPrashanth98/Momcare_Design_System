import { radius } from "../../tokens/radius";

describe("Radius tokens", () => {
  const REQUIRED_KEYS = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

  it.each(REQUIRED_KEYS)("defines radius-%s", (key) => {
    expect(radius[key as keyof typeof radius]).toBeDefined();
  });

  it("radius-none is 0", () => {
    expect(radius.none).toBe(0);
  });
});
