#!/bin/bash
# EdgeAI SDK Publication Script

echo "🚀 Preparing for Neural SDK Launch..."

# 1. Clear previous builds
rm -rf dist/ build/ *.egg-info

# 2. Build the package
python3 setup.py sdist bdist_wheel

# 3. Upload to PyPI (requires TWINE_USERNAME and TWINE_PASSWORD)
# twine upload dist/*

echo "✅ Package built successfully in dist/"
echo "💡 To publish, run: twine upload dist/*"
