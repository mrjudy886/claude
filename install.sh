#!/usr/bin/env bash
# Claude 桌宠 —— macOS / Linux 安装脚本
#
#   ./install.sh              安装到桌面（macOS 同时装进 ~/Applications）
#   ./install.sh --autostart  安装并设置开机自启
#   ./install.sh --uninstall  卸载（存档保留在 ~/.claude_pet.json）
#
set -euo pipefail

APP_NAME="Claude桌宠"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAIN="$SRC_DIR/claude_pet.py"

AUTOSTART=0
UNINSTALL=0
for arg in "$@"; do
  case "$arg" in
    --autostart) AUTOSTART=1 ;;
    --uninstall) UNINSTALL=1 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "未知参数: $arg"; exit 1 ;;
  esac
done

# ---------------------------------------------------------------- 桌面目录
desktop_dir() {
  if command -v xdg-user-dir >/dev/null 2>&1; then
    local d; d="$(xdg-user-dir DESKTOP 2>/dev/null || true)"
    [ -n "$d" ] && [ -d "$d" ] && { echo "$d"; return; }
  fi
  for d in "$HOME/Desktop" "$HOME/桌面"; do
    [ -d "$d" ] && { echo "$d"; return; }
  done
  mkdir -p "$HOME/Desktop"; echo "$HOME/Desktop"
}
DESKTOP="$(desktop_dir)"

# ---------------------------------------------------------------- 找 Python
find_python() {
  local candidates=(python3 python3.13 python3.12 python3.11 python3.10 python3.9 python)
  if [ -x /opt/homebrew/bin/python3 ]; then candidates=(/opt/homebrew/bin/python3 "${candidates[@]}"); fi
  if [ -x /usr/local/bin/python3 ]; then candidates+=(/usr/local/bin/python3); fi
  if [ -x /usr/bin/python3 ]; then candidates+=(/usr/bin/python3); fi
  for py in "${candidates[@]}"; do
    if command -v "$py" >/dev/null 2>&1 && "$py" -c "import tkinter" >/dev/null 2>&1; then
      command -v "$py"
      return 0
    fi
  done
  return 1
}

# ---------------------------------------------------------------- 卸载
if [ "$UNINSTALL" = 1 ]; then
  rm -rf "$HOME/Applications/$APP_NAME.app" "$DESKTOP/$APP_NAME.app" \
         "$DESKTOP/$APP_NAME.command" "$DESKTOP/claude-pet.desktop" \
         "$HOME/.local/share/applications/claude-pet.desktop" \
         "$HOME/.config/autostart/claude-pet.desktop"
  if [ -f "$HOME/Library/LaunchAgents/com.claudepet.plist" ]; then
    launchctl unload "$HOME/Library/LaunchAgents/com.claudepet.plist" 2>/dev/null || true
    rm -f "$HOME/Library/LaunchAgents/com.claudepet.plist"
  fi
  echo "✅ 已卸载（存档仍保留在 ~/.claude_pet.json，想彻底清掉就删掉它）"
  exit 0
fi

if ! PY="$(find_python)"; then
  echo "❌ 没找到带 tkinter 的 Python 3。"
  case "$(uname -s)" in
    Darwin) echo "   macOS：从 https://www.python.org/downloads/ 装官方版 Python 3 即可（自带 tkinter）。" ;;
    *)      echo "   Linux：请先安装 tkinter，例如：" ;
            echo "     Debian/Ubuntu:  sudo apt install python3-tk" ;
            echo "     Fedora:         sudo dnf install python3-tkinter" ;
            echo "     Arch:           sudo pacman -S tk" ;;
  esac
  exit 1
fi
echo "🐍 使用 Python: $PY"

[ -f "$SRC_DIR/assets/claude_pet.icns" ] || "$PY" "$SRC_DIR/tools/make_icon.py" >/dev/null 2>&1 || true

case "$(uname -s)" in
# =============================================================== macOS
Darwin)
  APP_DIR="$HOME/Applications/$APP_NAME.app"
  rm -rf "$APP_DIR"
  mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources"

  cat > "$APP_DIR/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>$APP_NAME</string>
  <key>CFBundleDisplayName</key><string>$APP_NAME</string>
  <key>CFBundleIdentifier</key><string>com.claudepet.desktop</string>
  <key>CFBundleVersion</key><string>1.0.0</string>
  <key>CFBundleShortVersionString</key><string>1.0.0</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleExecutable</key><string>ClaudePet</string>
  <key>CFBundleIconFile</key><string>claude_pet</string>
  <key>LSUIElement</key><true/>
  <key>NSHighResolutionCapable</key><true/>
</dict>
</plist>
PLIST

  cat > "$APP_DIR/Contents/MacOS/ClaudePet" <<LAUNCH
#!/bin/bash
exec "$PY" "$MAIN" "\$@"
LAUNCH
  chmod +x "$APP_DIR/Contents/MacOS/ClaudePet"
  [ -f "$SRC_DIR/assets/claude_pet.icns" ] && cp "$SRC_DIR/assets/claude_pet.icns" \
      "$APP_DIR/Contents/Resources/claude_pet.icns"

  rm -f "$DESKTOP/$APP_NAME.app"
  ln -s "$APP_DIR" "$DESKTOP/$APP_NAME.app"
  echo "✅ 已安装：$APP_DIR"
  echo "   桌面上已生成快捷方式，双击即可开始养"

  if [ "$AUTOSTART" = 1 ]; then
    mkdir -p "$HOME/Library/LaunchAgents"
    cat > "$HOME/Library/LaunchAgents/com.claudepet.plist" <<AGENT
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.claudepet</string>
  <key>ProgramArguments</key><array><string>$PY</string><string>$MAIN</string></array>
  <key>RunAtLoad</key><true/>
</dict></plist>
AGENT
    launchctl unload "$HOME/Library/LaunchAgents/com.claudepet.plist" 2>/dev/null || true
    launchctl load "$HOME/Library/LaunchAgents/com.claudepet.plist" 2>/dev/null || true
    echo "🔁 已设置开机自启"
  fi
  ;;

# =============================================================== Linux
*)
  ICON="$SRC_DIR/assets/claude_pet.png"
  APPS="$HOME/.local/share/applications"
  mkdir -p "$APPS"
  ENTRY="$APPS/claude-pet.desktop"
  cat > "$ENTRY" <<DESKTOPFILE
[Desktop Entry]
Type=Application
Name=Claude 桌宠
Comment=住在桌面上的 Claude 小玩偶（QQ 宠物玩法）
Exec="$PY" "$MAIN"
Path=$SRC_DIR
Icon=$ICON
Terminal=false
Categories=Game;Utility;
StartupNotify=false
DESKTOPFILE
  chmod +x "$ENTRY"
  cp "$ENTRY" "$DESKTOP/claude-pet.desktop"
  chmod +x "$DESKTOP/claude-pet.desktop"
  # GNOME 需要显式信任桌面图标
  command -v gio >/dev/null 2>&1 && \
    gio set "$DESKTOP/claude-pet.desktop" metadata::trusted true 2>/dev/null || true
  command -v update-desktop-database >/dev/null 2>&1 && \
    update-desktop-database "$APPS" 2>/dev/null || true

  echo "✅ 已安装到应用菜单，并在桌面生成了图标：$DESKTOP/claude-pet.desktop"

  if [ "$AUTOSTART" = 1 ]; then
    mkdir -p "$HOME/.config/autostart"
    cp "$ENTRY" "$HOME/.config/autostart/claude-pet.desktop"
    echo "🔁 已设置开机自启"
  fi
  ;;
esac

echo
echo "现在就试试：$PY \"$MAIN\""
echo "（右键小玩偶 = 玩法菜单，双击 = 摸头，拖动 = 换位置）"
