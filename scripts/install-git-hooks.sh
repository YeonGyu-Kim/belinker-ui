#!/bin/sh
# 이 저장소에서 npm install 할 때만 push 이후 훅을 설치합니다.
set -eu

cd "$(dirname "$0")/.."

if [ ! -f scripts/after-push ]; then
  exit 0
fi

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  exit 0
fi

root=$(git rev-parse --show-toplevel)
if [ "$root" != "$(pwd)" ]; then
  exit 0
fi

hooks=$(git rev-parse --git-path hooks)
mkdir -p "$hooks"
cat > "$hooks/reference-transaction" << 'EOF'
#!/bin/sh
root=$(git rev-parse --show-toplevel)
exec "$root/scripts/after-push" "$@"
EOF
chmod +x "$hooks/reference-transaction" scripts/after-push
rm -f "$hooks/pre-push"
