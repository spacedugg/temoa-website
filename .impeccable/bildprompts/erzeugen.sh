#!/usr/bin/env bash
# Erzeugt die Bilder der Startseite mit gpt-image-2.
# Voraussetzung: OPENAI_API_KEY ist in der Umgebung gesetzt.
set -euo pipefail
cd "$(dirname "$0")/../.."

S=".claude/skills/impeccable/scripts/generate-image.mjs"
P=".impeccable/bildprompts"
STIL="$(cat "$P/stil.txt")"

gen () { # $1 = Kennung, $2 = Groesse
  echo "→ $1 ($2)"
  node "$S" --prompt "$(cat "$P/$1.txt")

$STIL" --out "public/bilder/$1.png" --size "$2" --quality high
}

gen B-01 1024x1536   # Kopfbereich, hochkant
gen B-02 1536x1024   # Befund, quer
gen B-03 1536x1024   # Verfahren, quer auf Navy
gen B-04 1536x1024   # Umfang, quer

echo "Fertig. Dateien liegen in public/bilder/"
