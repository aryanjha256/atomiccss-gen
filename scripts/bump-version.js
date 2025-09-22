#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the version type from command line args
const args = process.argv.slice(2);
const versionType = args[0] || "patch";

if (!["major", "minor", "patch"].includes(versionType)) {
  console.error("Version type must be one of: major, minor, patch");
  process.exit(1);
}

// Read the current package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const currentVersion = packageJson.version;

// Parse the version components
const [major, minor, patch] = currentVersion.split(".").map(Number);

// Calculate the new version
let newVersion;
switch (versionType) {
  case "major":
    newVersion = `${major + 1}.0.0`;
    break;
  case "minor":
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case "patch":
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

// Create a new section in CHANGELOG.md
const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const changelog = fs.readFileSync(changelogPath, "utf-8");

const today = new Date().toISOString().split("T")[0];
const newChangelogEntry = `# Version: ${newVersion}\n\n## What's Changed\n\n- \n\n`;

const updatedChangelog = `${newChangelogEntry}${changelog}`;
fs.writeFileSync(changelogPath, updatedChangelog);

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
console.log(`Don't forget to update the CHANGELOG.md with your changes!`);

// Commit the changes
try {
  execSync(`git add package.json CHANGELOG.md`);
  execSync(`git commit -m "Bump version to ${newVersion}"`);
  execSync(`git tag -a v${newVersion} -m "Version ${newVersion}"`);
  console.log(`Changes committed and tagged as v${newVersion}`);
  console.log(
    `Run 'git push && git push --tags' to trigger the release process`
  );
} catch (error) {
  console.error("Error committing changes:", error.message);
}
