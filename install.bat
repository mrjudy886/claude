@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
rem ===========================================================
rem  Claude 桌宠 —— Windows 安装脚本
rem    install.bat              安装到桌面 + 开始菜单
rem    install.bat /autostart   安装并设置开机自启
rem    install.bat /uninstall   卸载（存档保留）
rem ===========================================================

set "SRC=%~dp0"
if "%SRC:~-1%"=="\" set "SRC=%SRC:~0,-1%"
set "MAIN=%SRC%\claude_pet.py"
set "ICON=%SRC%\assets\claude_pet.ico"
set "APPNAME=Claude桌宠"

set "DESKTOP=%USERPROFILE%\Desktop"
for /f "usebackq tokens=2,*" %%A in (`reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v Desktop 2^>nul`) do set "DESKTOP_RAW=%%B"
if defined DESKTOP_RAW call set "DESKTOP=%DESKTOP_RAW%"
set "STARTMENU=%APPDATA%\Microsoft\Windows\Start Menu\Programs"
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

if /i "%~1"=="/uninstall" goto :uninstall

rem ---------------------------------------------------- 找 pythonw.exe
set "PYW="
for /f "delims=" %%P in ('where pythonw.exe 2^>nul') do (
  if not defined PYW set "PYW=%%P"
)
if not defined PYW (
  py -3 -c "import sys,os;print(os.path.join(os.path.dirname(sys.executable),'pythonw.exe'))" >"%TEMP%\_cp_py.txt" 2>nul
  if not errorlevel 1 for /f "usebackq delims=" %%P in ("%TEMP%\_cp_py.txt") do set "PYW=%%P"
  del "%TEMP%\_cp_py.txt" 2>nul
)
if not defined PYW (
  echo.
  echo [X] 没有找到 Python。请先到 https://www.python.org/downloads/ 安装 Python 3，
  echo     安装时记得勾选 "Add python.exe to PATH"，然后重新运行本脚本。
  echo.
  pause
  exit /b 1
)
echo [√] 使用 Python: %PYW%

"%PYW%" -c "import tkinter" 2>nul
if errorlevel 1 (
  echo [X] 这个 Python 没有 tkinter，请用 python.org 的官方安装包重装 Python 3。
  pause
  exit /b 1
)

if not exist "%ICON%" (
  "%PYW%" "%SRC%\tools\make_icon.py" >nul 2>&1
)

rem ---------------------------------------------------- 创建快捷方式
call :mkshortcut "%DESKTOP%\%APPNAME%.lnk"
call :mkshortcut "%STARTMENU%\%APPNAME%.lnk"
echo [√] 已在桌面和开始菜单创建「%APPNAME%」

if /i "%~1"=="/autostart" (
  call :mkshortcut "%STARTUP%\%APPNAME%.lnk"
  echo [√] 已设置开机自启
)

echo.
echo 安装完成！双击桌面上的「%APPNAME%」就能开始养啦。
echo   右键小玩偶 = 玩法菜单（喂食/打工/商店/状态面板）
echo   双击 = 摸头    拖动 = 换位置
echo.
"%PYW%" "%MAIN%"
exit /b 0

rem ---------------------------------------------------- 子过程
:mkshortcut
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$s=(New-Object -ComObject WScript.Shell).CreateShortcut('%~1');" ^
  "$s.TargetPath='%PYW%';" ^
  "$s.Arguments='\"%MAIN%\"';" ^
  "$s.WorkingDirectory='%SRC%';" ^
  "$s.Description='住在桌面上的 Claude 小玩偶';" ^
  "if (Test-Path '%ICON%') { $s.IconLocation='%ICON%' };" ^
  "$s.Save()" >nul
exit /b 0

:uninstall
del "%DESKTOP%\%APPNAME%.lnk" 2>nul
del "%STARTMENU%\%APPNAME%.lnk" 2>nul
del "%STARTUP%\%APPNAME%.lnk" 2>nul
echo [√] 已卸载（存档仍保留在 %USERPROFILE%\.claude_pet.json）
pause
exit /b 0
