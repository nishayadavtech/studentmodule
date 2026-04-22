@echo off
setlocal
echo Starting Student Module dev server...
echo Using npm.cmd so PowerShell execution policy does not block startup.
if "%PORT%"=="" set PORT=3001
call npm.cmd start
