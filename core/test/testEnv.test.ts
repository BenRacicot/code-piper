describe("Test environment", () => {
  test("should have CODEPIPER_GLOBAL_DIR env var set to .continue-test", () => {
    expect(process.env.CODEPIPER_GLOBAL_DIR).toBeDefined();
    expect(process.env.CODEPIPER_GLOBAL_DIR)?.toMatch(/\.continue-test$/);
  });
});
