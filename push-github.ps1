# Git Push Script for Recipe-Book Project
# This script will push the project to GitHub

$gitBashPath = "C:\Program Files\Git\git-bash.exe"
$projectPath = "F:\web tech\Recipe-Book"

# Check if Git Bash exists
if (-Not (Test-Path $gitBashPath)) {
    Write-Host "Git Bash not found at $gitBashPath"
    Write-Host "Trying alternate locations..."
}

Write-Host "Project Path: $projectPath"
Write-Host ""
Write-Host "Starting git operations..."
Write-Host ""

# Create the git bash command
$gitCommand = @"
cd '/f/web tech/Recipe-Book'
git init
git config user.name 'JAMES'
git config user.email 'jamesa4252@gmail.com'
git remote add origin https://github.com/jamesar10305/webtechnology.git
git add .
git commit -m 'Initial commit: Recipe Book application with MongoDB backend'
git branch -M main
git push -u origin main
"@

# Run git commands via Git Bash
& $gitBashPath -c $gitCommand

Write-Host ""
Write-Host "Process complete!"
Write-Host "Your project has been pushed to GitHub!"
Write-Host "Repository: https://github.com/jamesar10305/webtechnology"
