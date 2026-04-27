#!/usr/bin/env node
/**
 * CLI for @kopplin-co/web-design.
 *
 * Default behavior on `npm install` is to run `install` via postinstall,
 * which copies SKILL.md into ~/.claude/skills/web-design/SKILL.md.
 *
 * Manual usage:
 *   claude-skill-web-design install      # (re)install the skill
 *   claude-skill-web-design uninstall    # remove the skill
 *   claude-skill-web-design where        # print the install path
 *   claude-skill-web-design --help
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "web-design";
const PKG_ROOT = path.resolve(__dirname, "..");
const SKILL_SRC = path.join(PKG_ROOT, "SKILL.md");
const SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");
const TARGET_DIR = path.join(SKILLS_DIR, SKILL_NAME);
const TARGET_FILE = path.join(TARGET_DIR, "SKILL.md");

const args = process.argv.slice(2);
const cmd = args[0] || "install";
const flags = new Set(args.slice(1));
const isPostinstall = flags.has("--postinstall");
const isQuiet = flags.has("--quiet") || isPostinstall;

function log(msg) {
  if (!isQuiet) console.log(msg);
}
function info(msg) {
  console.log(msg);
}
function warn(msg) {
  console.warn(msg);
}
function err(msg) {
  console.error(msg);
}

function ensureSourceExists() {
  if (!fs.existsSync(SKILL_SRC)) {
    err(`[claude-skill-web-design] Cannot find SKILL.md at ${SKILL_SRC}`);
    process.exit(1);
  }
}

function install() {
  ensureSourceExists();

  // If running as a transitive dep inside another package's node_modules, skip.
  // Heuristic: PKG_ROOT contains "/node_modules/" AND the parent of node_modules
  // is not the user's home directory (i.e., not a global install).
  const nmIdx = PKG_ROOT.indexOf(`${path.sep}node_modules${path.sep}`);
  if (nmIdx !== -1 && isPostinstall) {
    const consumer = PKG_ROOT.slice(0, nmIdx);
    const isGlobal = isLikelyGlobalInstall(PKG_ROOT);
    const isDirectInstall = process.env.npm_config_user_agent && !consumer.includes(`${path.sep}node_modules${path.sep}`);
    if (!isGlobal && !isDirectInstall) {
      // installed as a nested transitive dep; do nothing
      return;
    }
  }

  try {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    fs.copyFileSync(SKILL_SRC, TARGET_FILE);
  } catch (e) {
    err(`[claude-skill-web-design] Failed to install skill: ${e.message}`);
    if (!isPostinstall) process.exit(1);
    return;
  }

  if (isPostinstall) {
    info(`[claude-skill-web-design] Installed skill to ${TARGET_FILE}`);
  } else {
    info(`Installed Claude skill: web-design`);
    info(`  -> ${TARGET_FILE}`);
    info(`Restart Claude Code (or open a new session) to pick it up.`);
  }
}

function uninstall() {
  if (!fs.existsSync(TARGET_DIR)) {
    log(`[claude-skill-web-design] Nothing to uninstall (${TARGET_DIR} not found).`);
    return;
  }
  try {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
    log(`[claude-skill-web-design] Removed ${TARGET_DIR}`);
  } catch (e) {
    err(`[claude-skill-web-design] Failed to uninstall: ${e.message}`);
    process.exit(1);
  }
}

function where() {
  info(TARGET_FILE);
}

function help() {
  info(`@kopplin-co/web-design — Claude Code skill installer

Usage:
  claude-skill-web-design install      (default; runs automatically on npm install)
  claude-skill-web-design uninstall    Remove ~/.claude/skills/web-design
  claude-skill-web-design where        Print the install path
  claude-skill-web-design --help

Install path: ${TARGET_FILE}
`);
}

function isLikelyGlobalInstall(pkgRoot) {
  // Global installs put the package under e.g. /usr/local/lib/node_modules/<name>
  // or ~/.nvm/versions/node/<v>/lib/node_modules/<name>. The grandparent is "node_modules"
  // and the great-grandparent is typically "lib" or similar — but not another node_modules.
  const parts = pkgRoot.split(path.sep);
  const nmCount = parts.filter((p) => p === "node_modules").length;
  return nmCount === 1;
}

switch (cmd) {
  case "install":
    install();
    break;
  case "uninstall":
  case "remove":
    uninstall();
    break;
  case "where":
  case "path":
    where();
    break;
  case "-h":
  case "--help":
  case "help":
    help();
    break;
  default:
    err(`Unknown command: ${cmd}`);
    help();
    process.exit(1);
}
