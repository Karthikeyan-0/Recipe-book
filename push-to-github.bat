@echo off
setlocal enabledelayedexpansion

REM Find Git Bash installation
set "GIT_BASH="
if exist "C:\Program Files\Git\git-bash.exe" (
    set "GIT_BASH=C:\Program Files\Git\git-bash.exe"
) else if exist "C:\Program Files (x86)\Git\git-bash.exe" (
    set "GIT_BASH=C:\Program Files (x86)\Git\git-bash.exe"
) else (
    echo Git Bash not found. Please install Git Bash first.
    pause
    exit /b 1
)

REM Run git commands in Git Bash
!GIT_BASH! -c "cd '/f/web tech/Recipe-Book' && git init && git config user.name 'JAMES' && git config user.email 'jamesa4252@gmail.com' && git remote add origin https://github.com/jamesar10305/webtechnology.git && git add . && git commit -m 'Initial commit: Recipe Book application with MongoDB backend' && git branch -M main && git push -u origin main"

echo.
echo ✅ Project uploaded to GitHub successfully!
pause

REM Push to main branch
git branch -M main
git push -u origin main

pause
