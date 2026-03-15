describe("Barrel exports (src/index.ts)", () => {
  it("exports cn utility", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const exports = require("../src/index");
    expect(typeof exports.cn).toBe("function");
  });
});
