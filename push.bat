@echo off
REM Navigate to Recipe-Book folder and run git commands via Git Bash

cd /d "F:\web tech\Recipe-Book"

REM Run git commands using git-bash
"C:\Program Files\Git\bin\bash.exe" -c "cd /f/web\ tech/Recipe-Book && git init && git config --global user.name 'JAMES' && git config --global user.email 'jamesa4252@gmail.com' && git remote add origin https://github.com/jamesar10305/webtechnology.git && git add . && git commit -m 'Initial commit: Recipe Book application with MongoDB backend' && git branch -M main && git push -u origin main"

echo.
echo Project pushed to GitHub!
pause
