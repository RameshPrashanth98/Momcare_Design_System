import { shadows } from "../../tokens/shadows";

describe("Shadow tokens", () => {
  const REQUIRED_KEYS = ["xs", "sm", "md", "lg", "xl", "2xl", "inner"];

  it.each(REQUIRED_KEYS)("defines shadow-%s", (key) => {
    expect(shadows[key as keyof typeof shadows]).toBeDefined();
  });

  it("shadow-xs has shadowColor property", () => {
    expect(shadows.xs).toHaveProperty("shadowColor");
  });
});
