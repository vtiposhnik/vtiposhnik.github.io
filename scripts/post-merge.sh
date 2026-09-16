#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_files=(
    "index.html"
    "favicon.svg"
    "styles/styles.css"
    "scripts/animate.js"
    "scripts/scripts.js"
    "assets/about.json"
)

for file in "${required_files[@]}"; do
    test -f "$file"
done

python3 -m json.tool assets/about.json >/dev/null
node --check scripts/animate.js
node --check scripts/scripts.js

printf 'Post-merge checks passed.\n'