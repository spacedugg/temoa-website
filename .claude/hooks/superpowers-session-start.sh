#!/usr/bin/env bash
# SessionStart-Hook: laedt die Einfuehrung "using-superpowers" in jede Session.
# Angepasst aus obra/superpowers (MIT), dort als Plugin-Hook gebaut. Hier liegen die
# Skills direkt unter .claude/skills, deshalb kommt der Pfad aus CLAUDE_PROJECT_DIR.
set -euo pipefail

root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
skill_md="${root}/.claude/skills/using-superpowers/SKILL.md"
[ -r "$skill_md" ] || exit 0

content="$(<"$skill_md")"
esc() {
  local s="$1"
  s="${s//\\/\\\\}"; s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"; s="${s//$'\r'/\\r}"; s="${s//$'\t'/\\t}"
  printf '%s' "$s"
}
ctx="<EXTREMELY_IMPORTANT>\nYou have superpowers.\n\n**Below is the full content of your 'using-superpowers' skill - your introduction to using skills. For all other skills, use the 'Skill' tool:**\n\n$(esc "$content")\n</EXTREMELY_IMPORTANT>"
printf '{\n  "hookSpecificOutput": {\n    "hookEventName": "SessionStart",\n    "additionalContext": "%s"\n  }\n}\n' "$ctx"
