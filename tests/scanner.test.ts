import { strictEqual } from "assert";
import { describe, it } from "node:test";
import fs from "fs";
import path from "path";

// We need to use a regex similar to the one in scanner.ts
const CLASS_REGEX = /\b([a-zA-Z0-9]+(?:-\[[^\]]+\]))\b/g;

function extractClassesForTest(content: string): Set<string> {
  const matches = content.match(CLASS_REGEX) || [];
  return new Set(matches);
}

describe("scanner", () => {
  describe("class extraction", () => {
    it("should extract atomic classes from HTML content", () => {
      const html = `
        <div class="w-[100px] h-[200px] text-[#ff0000]">
          <p class="p-[10px] m-[5px]">Test</p>
        </div>
      `;

      const classes = extractClassesForTest(html);
      strictEqual(classes.size, 5);
      strictEqual(classes.has("w-[100px]"), true);
      strictEqual(classes.has("h-[200px]"), true);
      strictEqual(classes.has("text-[#ff0000]"), true);
      strictEqual(classes.has("p-[10px]"), true);
      strictEqual(classes.has("m-[5px]"), true);
    });

    it("should extract atomic classes from JSX content", () => {
      const jsx = `
        function Component() {
          return (
            <div className="flex-[1] gap-[10px]">
              <Button className="bg-[#333] text-[white]" />
            </div>
          );
        }
      `;

      const classes = extractClassesForTest(jsx);
      strictEqual(classes.size, 4);
      strictEqual(classes.has("flex-[1]"), true);
      strictEqual(classes.has("gap-[10px]"), true);
      strictEqual(classes.has("bg-[#333]"), true);
      strictEqual(classes.has("text-[white]"), true);
    });

    it("should handle multiple classes on the same element", () => {
      const content = '<div class="w-[50%] h-[100px] p-[20px]"></div>';

      const classes = extractClassesForTest(content);
      strictEqual(classes.size, 3);
      strictEqual(classes.has("w-[50%]"), true);
      strictEqual(classes.has("h-[100px]"), true);
      strictEqual(classes.has("p-[20px]"), true);
    });

    it("should not extract regular classes without brackets", () => {
      const content =
        '<div class="regular-class w-[50px] another-class"></div>';

      const classes = extractClassesForTest(content);
      strictEqual(classes.size, 1);
      strictEqual(classes.has("w-[50px]"), true);
      strictEqual(classes.has("regular-class"), false);
      strictEqual(classes.has("another-class"), false);
    });
  });
});
