#!/bin/bash

git add .

if git diff --cached --quiet; then
    echo "Ma kayn 7tta taghyir."
    exit 0
fi

git commit -m "Website update $(date '+%Y-%m-%d %H:%M:%S')"

git pull --rebase origin main

git push

echo "✅ Upload kamel bnejah."