import { spacing } from "../../tokens/spacing";

describe("Spacing tokens (4px grid)", () => {
  const REQUIRED_KEYS = ["1","2","3","4","5","6","8","10","12","16","20","24","32","40","48"];

  it.each(REQUIRED_KEYS)("defines space-%s", (key) => {
    expect(spacing[key as keyof typeof spacing]).toBeDefined();
    expect(typeof spacing[key as keyof typeof spacing]).toBe("number");
  });

  it("space-1 is 4px", () => {
    expect(spacing["1"]).toBe(4);
  });

  it("space-4 is 16px", () => {
    expect(spacing["4"]).toBe(16);
  });
});
