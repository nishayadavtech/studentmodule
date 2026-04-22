@echo off
setlocal
echo Building Student Module...
echo Using npm.cmd so PowerShell execution policy does not block the build.
if "%BUILD_PATH%"=="" set BUILD_PATH=build-output
call npm.cmd run build
