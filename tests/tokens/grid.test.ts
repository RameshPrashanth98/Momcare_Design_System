import tailwindConfig from "../../tailwind.config";

describe("Grid breakpoints", () => {
  it("tailwind config extends screens with sm breakpoint", () => {
    const screens = tailwindConfig.theme?.extend?.screens as Record<string, string> | undefined;
    expect(screens).toBeDefined();
    expect(screens?.sm).toBeDefined();
  });

  it("tailwind config extends screens with md breakpoint", () => {
    const screens = tailwindConfig.theme?.extend?.screens as Record<string, string> | undefined;
    expect(screens?.md).toBeDefined();
  });
});
