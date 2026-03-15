import { cn } from "../../src/utils/cn";

describe("cn() utility", () => {
  it("merges two class strings", () => {
    const result = cn("bg-rose-500", "text-white");
    expect(result).toBe("bg-rose-500 text-white");
  });

  it("deduplicates conflicting Tailwind classes (last wins)", () => {
    const result = cn("bg-rose-500", "bg-cream-50");
    // tailwind-merge keeps the last conflicting class
    expect(result).toBe("bg-cream-50");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "ignored", "applied");
    expect(result).toBe("base applied");
  });

  it("handles undefined and null gracefully", () => {
    const result = cn("base", undefined, null as unknown as string);
    expect(result).toBe("base");
  });
});
