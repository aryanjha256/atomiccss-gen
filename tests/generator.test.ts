import { strictEqual } from "assert";
import { describe, it } from "node:test";
import { generateCssForClass } from "../src/generator.js";

describe("generateCssForClass", () => {
  it("should generate CSS for width", () => {
    const result = generateCssForClass("w-[50%]");
    strictEqual(result, ".w-\\[50\\%\\]{width:50%;}");
  });

  it("should generate CSS for height", () => {
    const result = generateCssForClass("h-[200px]");
    strictEqual(result, ".h-\\[200px\\]{height:200px;}");
  });

  it("should generate CSS for text color", () => {
    const result = generateCssForClass("text-[#ff0000]");
    strictEqual(result, ".text-\\[\\#ff0000\\]{color:#ff0000;}");
  });

  it("should generate CSS for padding", () => {
    const result = generateCssForClass("p-[10px]");
    strictEqual(result, ".p-\\[10px\\]{padding:10px;}");
  });

  it("should generate CSS for horizontal padding", () => {
    const result = generateCssForClass("px-[20px]");
    strictEqual(
      result,
      ".px-\\[20px\\]{padding-left:20px;padding-right:20px;}"
    );
  });

  it("should return null for unsupported classes", () => {
    const result = generateCssForClass("unsupported-class");
    strictEqual(result, null);
  });
});
