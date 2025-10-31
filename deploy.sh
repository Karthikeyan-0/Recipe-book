#!/bin/bash

cd /f/web\ tech/Recipe-Book

echo "Initializing git repository..."
git init

echo "Configuring git user..."
git config --global user.name "JAMES"
git config --global user.email "jamesa4252@gmail.com"

echo "Adding remote repository..."
git remote add origin https://github.com/jamesar10305/webtechnology.git

echo "Creating .gitignore file..."
cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
dist/
build/
.vscode/
*.log
.env.local
EOF

echo "Staging all files..."
git add .

echo "Creating initial commit..."
git commit -m "Initial commit: Recipe Book application with MongoDB backend"

echo "Setting main branch..."
git branch -M main

echo "Pushing to GitHub..."
git push -u origin main

echo "✅ Project successfully pushed to GitHub!"
