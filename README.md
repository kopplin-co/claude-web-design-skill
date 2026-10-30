# @kopplin-co/claude-web-design-skill

A [Claude Code](https://claude.com/claude-code) skill that gives Claude opinionated visual design guidance for marketing websites and web UIs. Defaults to a Next.js + Tailwind stack, with no component library required.

When this skill is installed, Claude will activate it automatically on requests like:

- "design a hero section"
- "review this landing page"
- "make this look better"
- "what colors should I use?"
- "polish the UI"
- "make it pop"

## Install

```bash
npm install @kopplin-co/claude-web-design-skill
```

That's it. The package's `postinstall` script copies `SKILL.md` into:

```
~/.claude/skills/web-design/SKILL.md
```

Claude Code reads that directory at startup, so restart Claude Code (or open a new session) for it to pick up the new skill.

### Global install

```bash
npm install -g @kopplin-co/claude-web-design-skill
```

A global install also installs the `web-design` CLI on your PATH.

## CLI

After install, you can re-run the installer or remove the skill manually:

```bash
web-design install      # (re)copy SKILL.md into ~/.claude/skills/web-design
web-design uninstall    # remove ~/.claude/skills/web-design
web-design where        # print the install path
web-design --help
```

If you only did a local (non-global) install, run the CLI with `npx`:

```bash
npx web-design uninstall
```

## Uninstall

```bash
npm uninstall @kopplin-co/claude-web-design-skill
```

The package's `preuninstall` script removes `~/.claude/skills/web-design/`. If for any reason that step is skipped, run:

```bash
npx web-design uninstall
```

or delete the directory by hand.

## What's in the skill

`SKILL.md` covers:

- The Mood Dial: picking temperature, energy, voice, and surface on purpose
- Design system defaults (typography, OKLCH color tokens, spacing, radii, shadows, texture)
- The signature moment: one memorable, value-proving element per page
- Layout patterns (heroes, bento grids of live mini-demos, steps, final CTA)
- Components in plain Tailwind and semantic HTML (buttons, nav, FAQ, tabs, code windows, forms)
- CSS-first motion with reduced-motion fallbacks
- Copy voice, and a ban list of generic AI phrasing
- Responsive design
- Accessibility (WCAG AA floor)
- What reads dated, what reads generic, and what reads premium
- A 10-point design review checklist
- An opinionated process for designing from scratch

It is tuned for Tailwind v4 and CSS variable tokens, but the principles transfer to any stack.

## How Claude Code skills work

Claude Code looks for skills in `~/.claude/skills/<skill-name>/SKILL.md`. Each skill has YAML frontmatter (name, description, optional `allowed-tools` and metadata) followed by markdown that Claude consults when the description matches the user's request. See the [Claude Code docs](https://docs.claude.com/en/docs/claude-code) for details.

## License

[MIT](LICENSE) © Kopplin Co.
