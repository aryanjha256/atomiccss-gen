import { strictEqual, deepStrictEqual } from "assert";
import { describe, it, beforeEach, afterEach } from "node:test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { scanAndGenerate } from "../src/scanner.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("integration", () => {
  const testDir = path.join(__dirname, "temp-test-dir");
  const testFile = path.join(testDir, "test.html");
  const outputFile = path.join(testDir, "output.css");

  beforeEach(() => {
    // Create temporary test directory and test file
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
      fs.rmdirSync(testDir);
    }
  });

  it("should generate CSS from HTML file", async () => {
    // Create a test HTML file with atomic classes
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <div class="w-[300px] h-[200px] text-[#ff0000]">
            <p class="p-[20px] m-[10px]">Test content</p>
          </div>
        </body>
      </html>
    `;
    fs.writeFileSync(testFile, html);

    // Run the scan and generate function
    await scanAndGenerate({
      srcDir: testDir,
      outFile: outputFile,
    });

    // Let's see the actual content for debugging
    console.log("Generated CSS:", fs.readFileSync(outputFile, "utf-8"));

    // Check if the output file exists
    strictEqual(
      fs.existsSync(outputFile),
      true,
      "Output file should be created"
    );

    // Read and verify the generated CSS
    const css = fs.readFileSync(outputFile, "utf-8");

    // Check for expected CSS classes
    const expectedClasses = [
      ".w-\\[300px\\]{width:300px;}",
      ".h-\\[200px\\]{height:200px;}",
      ".text-\\[\\#ff0000\\]{color:#ff0000;}",
      ".p-\\[20px\\]{padding:20px;}",
      ".m-\\[10px\\]{margin:10px;}",
    ];

    for (const expectedClass of expectedClasses) {
      strictEqual(
        css.includes(expectedClass),
        true,
        `CSS should include ${expectedClass}`
      );
    }
  });
});
