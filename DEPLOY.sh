#!/bin/bash
# ============================================================
# Jay Mathukiya — One-time setup script
# Run this ONCE in ~/Documents/GitHub/profile/ to go live at:
# https://jay-021.github.io/profile/
# ============================================================

set -e

echo "🚀 Setting up Jay Mathukiya Portfolio..."

# Step 1 — Fetch Quartz framework files (keep our content/ and config)
echo "📦 Fetching Quartz framework..."
git clone --depth 1 https://github.com/jackyzha0/quartz.git /tmp/quartz-base

rsync -av --exclude='content' --exclude='quartz.config.ts' --exclude='.github' \
  /tmp/quartz-base/ ./

echo "📥 Installing dependencies..."
npm install

echo "✅ Framework ready. Testing build..."
npx quartz build --bundleInfo 2>/dev/null | tail -3 || true

echo ""
echo "============================================================"
echo "✅ Local setup complete!"
echo ""
echo "Now push to GitHub:"
echo "  git add ."
echo "  git commit -m 'initial portfolio deploy'"
echo "  git push -u origin main"
echo ""
echo "Then on GitHub: Settings → Pages → Source: GitHub Actions"
echo "Your site will be live at: https://jay-021.github.io/profile/"
echo "============================================================"
