# @kopplin-co/claude-web-design-skill

A [Claude Code](https://claude.com/claude-code) skill that gives Claude opinionated visual design guidance for marketing websites and web UIs. Defaults to a Next.js + Tailwind + shadcn/ui stack.

When this skill is installed, Claude will activate it automatically on requests like:

- "design a hero section"
- "review this landing page"
- "make this look better"
- "what colors should I use?"
- "polish the UI"

## Install

```bash
npm install @kopplin-co/claude-web-design-skill
```

That's it. The package's `postinstall` script copies `SKILL.md` into:

```
~/.claude/skills/claude-web-design-skill/SKILL.md
```

Claude Code reads that directory at startup, so restart Claude Code (or open a new session) for it to pick up the new skill.

### Global install

```bash
npm install -g @kopplin-co/claude-web-design-skill
```

A global install also installs the `claude-web-design-skill` CLI on your PATH.

## CLI

After install, you can re-run the installer or remove the skill manually:

```bash
claude-web-design-skill install      # (re)copy SKILL.md into ~/.claude/skills/claude-web-design-skill
claude-web-design-skill uninstall    # remove ~/.claude/skills/claude-web-design-skill
claude-web-design-skill where        # print the install path
claude-web-design-skill --help
```

If you only did a local (non-global) install, run the CLI with `npx`:

```bash
npx claude-web-design-skill uninstall
```

## Uninstall

```bash
npm uninstall @kopplin-co/claude-web-design-skill
```

The package's `preuninstall` script removes `~/.claude/skills/claude-web-design-skill/`. If for any reason that step is skipped, run:

```bash
npx claude-web-design-skill uninstall
```

or delete the directory by hand.

## What's in the skill

`SKILL.md` covers:

- Design system defaults (typography, color, spacing, radii, shadows)
- Layout patterns (heroes, sections, grids)
- Component design (buttons, forms, navigation, cards)
- Responsive design
- Accessibility (WCAG AA floor)
- Modern aesthetic conventions and what's dated
- A 10-point design review checklist
- An opinionated process for designing from scratch

It is tuned for Tailwind tokens and shadcn/ui's CSS variable convention, but the principles transfer to any stack.

## How Claude Code skills work

Claude Code looks for skills in `~/.claude/skills/<skill-name>/SKILL.md`. Each skill has YAML frontmatter (name, description, optional `allowed-tools` and metadata) followed by markdown that Claude consults when the description matches the user's request. See the [Claude Code docs](https://docs.claude.com/en/docs/claude-code) for details.

## License

[MIT](LICENSE) © Kopplin Co.
