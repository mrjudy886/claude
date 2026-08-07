#!/usr/bin/env node
const { spawn } = require("child_process");

let electronPath;
try {
  electronPath = require("electron");
} catch (e) {
  console.error("Electron not found. Run: npm install");
  process.exit(1);
}

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronPath, ["."], {
  stdio: "inherit",
  env,
  cwd: __dirname,
});

child.on("close", (code) => process.exit(code ?? 0));
